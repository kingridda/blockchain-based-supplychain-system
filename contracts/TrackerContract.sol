// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract TrackerContract {
    address private immutable ADMIN;

    // add modifiers auth only client only manufacturer only
    modifier onlyAdmin(){
        require(ADMIN == msg.sender, "Admin only");
        _;
    }
    modifier onlyManufacturer(){
        require( bytes(manufacturers[msg.sender].name).length != 0  , "Manufacturer only");
        _;
    }

    struct Manufacturer{
        string name;
        string description; 
        uint256 createdAt;
    }
    struct Transitioner{
        string name;
        string description;   
        uint256 createdAt;
    }
    struct Transition{
        address transitionerAddr;
        bool decision;
        uint256 createdAt;
    }
    struct Item{
        string name;
        string description;
        uint256 createdAt;
        Transition[] transitions;
    }
    mapping(address => Manufacturer) private manufacturers;
    mapping(address => Transitioner) private transitioners;
    mapping(string => Item) private items;
    constructor(){
        ADMIN = msg.sender;
        transitioners[msg.sender] = Transitioner("Tname", "Tdesc", block.timestamp);
        manufacturers[msg.sender] = Manufacturer("Mname", "Mdesc", block.timestamp);
        Item storage it = items["product00"];
        it.name = "product name";
        it.description = "product long description";
        it.createdAt = block.timestamp;
        it.transitions.push(Transition(msg.sender, true, block.timestamp));
        it.transitions.push(Transition(msg.sender, true, block.timestamp));
    }
    //calldata is constant

    function getManufacturer(address id) external view returns(Manufacturer memory){
        return manufacturers[id];
    }
    function getTransitioner(address id) external view returns(Transitioner memory){
        return transitioners[id];
    }
    function getItem(string memory id) external view returns(Item memory){
        return items[id];
    }
    function addManufacturer(address id, string memory name, string memory description)external {
        Manufacturer storage man = manufacturers[id];
        man.name = name;
        man.description = description;
        man.createdAt = block.timestamp;
    }
    function addTransitioner(address id, string memory name, string memory description)external {
        Transitioner storage tr = transitioners[id];
        tr.name = name;
        tr.description = description;
        tr.createdAt = block.timestamp;
    }
    function addItem(string memory id, string memory name, string memory description)external {
        Item storage it = items[id];
        it.name = name;
        it.description = description;
        it.createdAt = block.timestamp;
        it.transitions.push(Transition(msg.sender, true, block.timestamp));
    
    }
    function addTransition(string memory id, bool decision)external{
        items[id].transitions.push(Transition(msg.sender, decision, block.timestamp));
    }
    //flag product
    function flagProduct(string memory id)  external{
        items[id].transitions.push(Transition(msg.sender, false, block.timestamp));
    }
}