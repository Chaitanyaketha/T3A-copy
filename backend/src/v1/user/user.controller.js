// const userService = require('./user.service.js');

// const getUser = async (req, res) => {
//   const userId = req.user.id;
  
//   try {
//     const user = await userService.getUserById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
     
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// const updateUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const updatedData = req.body; 
//    console.log(updatedData);
//    console.log("hello");
//     const updatedUser = await userService.updateUser(userId, updatedData);


//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message || 'Error updating user data' });
//   }
// };



// module.exports = { getUser ,updateUser};


const userService = require('./user.service.js');

const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedData = req.body; 
    console.log(updatedData); // Debugging

    const updatedUser = await userService.updateUser(userId, updatedData);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Error updating user data' });
  }
};

module.exports = { getUser, updateUser };