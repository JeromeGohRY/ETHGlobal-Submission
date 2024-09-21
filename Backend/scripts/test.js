const hre = require('hardhat');

async function main() {
    const eventBettingAddress = '0x3e939f19de3f0e858Cac10137b78d28Df7E63c3E'; // Your deployed EventBetting contract address
    const stakingTokenAddress = "0xa4f0b7ba97cFB2fD31Ed31311844eea0786C4D81"; // AMB Token address
    const [signer] = await hre.ethers.getSigners();

    // Get EventBetting contract instance
    const EventBetting = await hre.ethers.getContractAt('EventBetting', eventBettingAddress);
    

    // Get the staking token (AMB) address from the EventBetting contract
    // const stakingTokenAddress = await EventBetting.stakingToken();
    console.log(`Staking Token Address (AMB): ${stakingTokenAddress}`);

    // Get the IERC20 interface for the AirDAO (AMB) token
    const StakingToken = new hre.ethers.Contract(
        stakingTokenAddress,
        [
            "function balanceOf(address account) view returns (uint256)", // Standard ERC-20 balanceOf function
            "function transfer(address recipient, uint256 amount) external returns (bool)",
            "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)"
        ],
        signer
    );

    // Output signer's address
    console.log(`Signer address: ${signer.address}`);

    // Check signer's balance of the staking token (AMB)
    const balance = await StakingToken.balanceOf(signer.address);
    console.log(balance);
    console.log(`Signer balance: ${hre.ethers.utils.formatUnits(balance, 18)} AMB tokens`);

    // Optional: Interact with the EventBetting contract to place a bet
    // Assuming the Outcome enum is defined as 1 = Option1, 2 = Option2
    const betAmount = hre.ethers.utils.parseUnits("10", 18); // Betting 10 AMB tokens
    const betOutcome = 1; // Option1 (you can modify this based on the Outcome enum)
    
    // Place the bet by calling the EventBetting contract
    const placeBetTx = await EventBetting.placeBet(betOutcome, betAmount);
    console.log('Bet placed:', placeBetTx.hash);
    
    // Wait for the transaction to be confirmed
    await placeBetTx.wait();
    console.log('Bet transaction confirmed');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });




// async function main() {
//     const eventBettingAddress = '0xc18e4D413064CE15AFB1e451Fef46C2A9B43D64f'; // Replace with your deployed contract address
//     const stakingTokenAddress = '0x74EEb65Fb630603E2e298a45f2cC61139594422A'; // Replace with your AirDAO token address
//     const [signer] = await hre.ethers.getSigners(); // Get the signer (the account interacting)

//     console.log('Signer address:', signer.address);

//     const EventBetting = await hre.ethers.getContractFactory('EventBetting');
//     const eventBetting = EventBetting.attach(eventBettingAddress);
//     const stakingToken = await hre.ethers.getContractAt('IERC20', stakingTokenAddress);

//     // Check balance before placing a bet
//     const initialBalance = await stakingToken.balanceOf(signer.address);
//     console.log('Initial balance of signer:', hre.ethers.utils.formatUnits(initialBalance, 18));

//     // Approve tokens for staking
//     const amountToStake = hre.ethers.utils.parseUnits('10', 18); // Example: 10 tokens
//     await stakingToken.approve(eventBettingAddress, amountToStake);
//     console.log('Tokens approved for staking');

//     // Place the bet
//     try {
//         await eventBetting.placeBet(1, amountToStake); // Assuming Option1 corresponds to 1
//         console.log('Bet placed successfully');
//     } catch (error) {
//         console.error('Error placing bet:', error);
//     }

//     // Verify user stake after placing the bet
//     const userStake = await eventBetting.stakes(signer.address);
//     console.log('User stake after bet:', hre.ethers.utils.formatUnits(userStake, 18));

//     // Resolve the event (if you're the admin)
//     try {
//         await eventBetting.resolveEvent(1); // Assuming Option1 is the winning outcome
//         console.log('Event resolved successfully');
//     } catch (error) {
//         console.error('Error resolving event:', error);
//     }

//     // Check the total staked amount
//     const totalStaked = await eventBetting.totalStaked();
//     console.log('Total staked after resolution:', hre.ethers.utils.formatUnits(totalStaked, 18));
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });
