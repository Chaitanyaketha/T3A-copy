import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as FileSaver from 'file-saver';
import * as JSZip from 'jszip';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: File | null = null;
  files: any[] = [];
  selectedFileNames: string[] = [];
  showModal = false;
  modalFileContent: any = null;
  modalFileType: string | null = null;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchUploadedFiles();
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  deleteFile(fileName: string): void {
    this.files = this.files.filter(file => file.name !== fileName);
    this.selectedFileNames = this.selectedFileNames.filter(name => name !== fileName);
  }
  

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadFile(); // Automatically upload the file after selection
    }
  }

  fetchUploadedFiles(): void {
    this.http.get<any[]>('http://localhost:4000/api/v1/user/files/files').subscribe(
      (response) => {
        this.files = response;
      },
      (error) => {
        console.error('Error fetching files:', error);
      }
    );
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const fileName = this.selectedFile.name;
      const fileType = this.selectedFile.type;

      this.http
        .get('http://localhost:4000/api/v1/user/files/get-presigned-url', {
          params: { fileName, fileType },
        })
        .subscribe(
          (response: any) => {
            const putUrl = response.url;
            this.http
              .put(putUrl, this.selectedFile, {
                headers: { 'Content-Type': fileType },
              })
              .subscribe(
                () => {
                  console.log('File uploaded successfully to S3!');
                  this.fetchUploadedFiles();
                },
                (error) => {
                  console.error('Error uploading file:', error);
                }
              );
          },
          (error) => {
            console.error('Error getting pre-signed URL for PUT:', error);
          }
        );
    }
  }

  toggleFileSelection(fileName: string): void {
    const index = this.selectedFileNames.indexOf(fileName);
    if (index === -1) {
      this.selectedFileNames.push(fileName);
    } else {
      this.selectedFileNames.splice(index, 1);
    }
  }

  selectAllFiles(event: any): void {
    if (event.target.checked) {
      this.selectedFileNames = this.files.map((file) => file.name);
    } else {
      this.selectedFileNames = [];
    }
  }

  isAllSelected(): boolean {
    return this.files.length === this.selectedFileNames.length;
  }

  showFile(fileName: string): void {
    this.http
      .get<{ urls: { fileName: string; url: string }[] }>( // Get presigned URLs
        'http://localhost:4000/api/v1/user/files/get-presigned-urls-for-get',
        {
          params: { fileNames: fileName },
        }
      )
      .subscribe({
        next: (response) => {
          const fileData = response.urls.find((file) => file.fileName === fileName);
          if (!fileData) {
            console.error('File URL not found for:', fileName);
            alert('File URL not found');
            return;
          }

          // Extract the image URL (assuming CSV data format, where image URL is the last element)
          const fileContent = fileData.url; // This might be a CSV string
          const parts = fileContent.split(','); // Split by commas
          const imageUrl = parts[parts.length - 1]; // Assuming the last part is the image URL

          // Sanitize only the image URL
          const sanitizedImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);

          // Fetch the file content (e.g., image, PDF) based on the URL
          this.http.get(fileData.url, { responseType: 'blob' }).subscribe({
            next: (fileBlob: Blob) => {
              this.modalFileType = fileBlob.type;

              // Handle image files (JPEG, PNG, etc.)
              if (fileBlob.type.startsWith('image')) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  const imageUrl = fileReader.result as string; // Data URL for the image
                  // Sanitize the image URL before using it
                  this.modalFileContent = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
                  this.showModal = true;
                };
                fileReader.readAsDataURL(fileBlob);
              }
              // Handle other file types (e.g., PDF, text, Excel) similarly
              // Handle PDF files
              else if (fileBlob.type === 'application/pdf') {
                const pdfURL = URL.createObjectURL(fileBlob);
                this.modalFileContent = this.sanitizer.bypassSecurityTrustResourceUrl(pdfURL);
                this.showModal = true;
              }
              // Handle text files
              else if (fileBlob.type.startsWith('text')) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  this.modalFileContent = fileReader.result as string; // Plain text content
                  this.showModal = true;
                };
                fileReader.readAsText(fileBlob);
              }
              // Handle Excel files
              else if (
                fileBlob.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              ) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                  const arrayBuffer = e.target?.result as ArrayBuffer;
                  try {
                    const wb = XLSX.read(arrayBuffer, { type: 'array' });
                    const sheet = wb.Sheets[wb.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    this.modalFileContent = jsonData;
                    this.showModal = true;
                  } catch (error) {
                    console.error('Error reading Excel file:', error);
                    alert('Error parsing Excel file. Please try again.');
                  }
                };
                fileReader.readAsArrayBuffer(fileBlob);
              } else {
                console.error('Unsupported file type:', fileBlob.type);
                alert('Unsupported file type for preview.');
              }
            },
            error: (err) => {
              console.error('Error fetching file content:', err);
              alert('Error fetching file content.');
            },
          });
        },
        error: (err) => {
          console.error('Error fetching file URL:', err);
          alert('Error fetching file URL.');
        },
      });
  }



  closeModal(): void {
    this.showModal = false;
    this.modalFileContent = null;
    this.modalFileType = null;
  }

  downloadSelectedFiles(): void {
    if (this.selectedFileNames.length > 0) {
      this.http
        .get<{ urls: { fileName: string; url: string }[] }>( // Fetch presigned URLs
          'http://localhost:4000/api/v1/user/files/get-presigned-urls-for-get',
          {
            params: { fileNames: this.selectedFileNames.join(',') },
          }
        )
        .subscribe({
          next: (response) => {
            const zip = new JSZip();

            response.urls.forEach((fileData) => {
              this.http.get(fileData.url, { responseType: 'arraybuffer' }).subscribe({
                next: (fileContent) => {
                  zip.file(fileData.fileName, fileContent);
                },
                error: (err) => {
                  console.error('Error downloading file:', err);
                },
                complete: () => {
                  zip.generateAsync({ type: 'blob' }).then((content) => {
                    FileSaver.saveAs(content, 'downloaded_files.zip');
                  });
                },
              });
            });
          },
          error: (err) => {
            console.error('Error fetching pre-signed URLs:', err);
          },
        });
    } else {
      alert('Please select files to download.');
    }
  }
}
