
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Todolist {
    uint256 public _idUser;
    address public ownerOfContract;

    address[] public creators;
    string[] public message;
    uint256[] public messageId;


    struct ToDoListApp {
        address account; 
        uint256 userId;
        string message;
        bool completed;

    }

    event ToDoevent (
        address indexed account,
        uint256 indexed userId,
        string message,
        bool completed
    );

    mapping (address => ToDoListApp) public todolistapps;

    constructor() {
        ownerOfContract = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }
    /// @notice Create New To-Do List
    /// @dev Explain to a developer any extra details
    /// @param _message a parameter needed to deploy the create the todolist with a title
    function createList(string calldata _message) external {
        inc();

        uint256 idNumber = _idUser;
        ToDoListApp storage toDo = todolistapps[msg.sender];

        toDo.account = msg.sender;
        toDo.message = _message;
        toDo.completed = false;
        toDo.userId = idNumber;

        creators.push(msg.sender);
        message.push(_message);
        messageId.push(idNumber);

        emit ToDoevent(msg.sender, toDo.userId, _message, toDo.completed);

    }

    function getCreatorData(address _address) public view returns(address, uint, string memory, bool) {
        ToDoListApp memory singleUserData = todolistapps[_address];

        return (
            singleUserData.account,
            singleUserData.userId,
            singleUserData.message,
            singleUserData.completed
        );
    }

    function getAddress() external view returns (address[] memory) {
        return creators;
    }

    function getMessage() external view returns (string[] memory) {
        return message;
    }

    function toggle(address _creator) public {
        ToDoListApp storage singleUserData = todolistapps[_creator];
        singleUserData.completed = !singleUserData.completed;
    }

}
