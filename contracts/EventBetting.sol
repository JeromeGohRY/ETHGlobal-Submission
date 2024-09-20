// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract EventBetting {
    IERC20 public stakingToken;
    uint256 public bettingEndTime;
    address public admin;
    address[] public users;
    bool public eventResolved;
    uint256 public totalStaked;
    
    enum Outcome { None, Option1, Option2 }  // Two possible outcomes for a discrete event
    mapping(address => uint256) public stakes;
    mapping(address => Outcome) public userBets;
    mapping(Outcome => uint256) public outcomeStakes;

    event BetPlaced(address indexed user, Outcome outcome, uint256 amount);
    event EventResolved(Outcome winningOutcome);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyDuringBettingPeriod() {
        require(block.timestamp <= bettingEndTime, "Betting period has ended");
        _;
    }

    modifier onlyAfterBettingPeriod() {
        require(block.timestamp > bettingEndTime, "Betting period is still active");
        _;
    }

    constructor(IERC20 _stakingToken, uint256 _bettingDuration) {
        stakingToken = _stakingToken;
        bettingEndTime = block.timestamp + _bettingDuration;
        admin = msg.sender;
    }

    // Users place their bet by staking AMB tokens
    function placeBet(Outcome _outcome, uint256 _amount) public onlyDuringBettingPeriod {
    require(_amount > 0, "Stake must be greater than 0");
    require(_outcome == Outcome.Option1 || _outcome == Outcome.Option2, "Invalid outcome");

    // Transfer AMB tokens from the user to the contract
    stakingToken.transferFrom(msg.sender, address(this), _amount);

    // Track user's bet and amount staked
    if (stakes[msg.sender] == 0) {
        users.push(msg.sender);  // Add user to the list if it's their first bet
    }
    stakes[msg.sender] += _amount;
    userBets[msg.sender] = _outcome;
    outcomeStakes[_outcome] += _amount;
    totalStaked += _amount;

    emit BetPlaced(msg.sender, _outcome, _amount);
}


    // Admin resolves the event, determining the winning outcome
   function resolveEvent(Outcome _winningOutcome) public onlyAdmin onlyAfterBettingPeriod {
    require(!eventResolved, "Event has already been resolved");
    require(_winningOutcome == Outcome.Option1 || _winningOutcome == Outcome.Option2, "Invalid outcome");

    eventResolved = true;
    emit EventResolved(_winningOutcome);

    // Distribute rewards to winners
    uint256 winnerPool = outcomeStakes[_winningOutcome];
    if (winnerPool > 0) {
        for (uint256 i = 0; i < users.length; i++) {  // Iterate through the list of users
            address user = users[i];
            if (userBets[user] == _winningOutcome) {
                uint256 userStake = stakes[user];
                uint256 reward = (userStake * totalStaked) / winnerPool;  // Calculate proportion of total prize pool
                stakingToken.transfer(user, reward);  // Payout reward
            }
        }
    }
}


    // Allow users to withdraw their stake if the event is unresolved (failsafe mechanism)
    function withdrawUnresolvedStake() public onlyAfterBettingPeriod {
        require(!eventResolved, "Cannot withdraw after the event is resolved");
        
        uint256 userStake = stakes[msg.sender];
        require(userStake > 0, "No stake to withdraw");

        // Refund the user's stake
        stakes[msg.sender] = 0;
        stakingToken.transfer(msg.sender, userStake);
    }
}
