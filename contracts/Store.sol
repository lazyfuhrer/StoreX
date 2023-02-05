// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Store {
    // Stores the address and the access status given by the sender to an address.
    struct Access {
        address user;
        bool access;
    }
    
    mapping(address => string[]) value;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;

    // Checking for invalid user address
    function validateAddress(address user) internal pure {
        require(user != address(0), "Error: Invalid user address");
    }
    // Adding user address and file url to the value array.
    function add(address _user, string memory url) public {
        validateAddress(_user);
        value[_user].push(url);
    }
    // Allowing users through ownership array by the msg.sender.
    function allow(address user) public {
        validateAddress(user);
        ownership[msg.sender][user] = true;
    /*  If the user already exists, simply it will loop through
        the accessList array and set the access to true ans set found to true.
        Else will push the user to the accessList.
    */ 
        bool found = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = true;
                found = true;
                break;
            }
        }
        if (!found) {
            accessList[msg.sender].push(Access(user, true));
        }
    }
    /*  Revoking access of an user in ownership array and looping through accessList,
        and if user found, set access to false.
    */ 
    function revoke(address user) public {
        validateAddress(user);
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
                break;
            }
        }
    }
    //  Displaying the file url of the corresponding user if the have the access.
    function display(address _user) public view returns (string[] memory) {
        validateAddress(_user);
        require(
            _user == msg.sender || ownership[_user][msg.sender],
            "Error: Access denied. You do not have permission to view this file."
        );
        return value[_user];
    }
    // Returns the Access struct with the list of shared access users.
    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}