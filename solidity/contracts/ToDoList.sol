// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Todolist {
    uint256 public _idUser;
    address public ownerOfContract;

    address[] public creators;
    string[] public message;
    uint256[] public messageId;


    struct ToDoListApp {
        address acount; 
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
        owner = msg.sender;
    }

    function inc() internal {
        _idUser++;
    }

    function createList(string calldata _message) external {
        inc();

        uint256 idNumber = _idUser;

    }