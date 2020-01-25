pragma solidity 0.5.0;

contract HelloWorld {
    string public message;

    constructor(string memory _initMessage) public {
        message = _initMessage;
    }

    function update(string memory _newMessage) public {
        message = _newMessage;
    }
}
