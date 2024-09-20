//0x74EEb65Fb630603E2e298a45f2cC61139594422A
//0xc18e4D413064CE15AFB1e451Fef46C2A9B43D64f
const hre = require('hardhat');

async function main() {
    const stakingTokenAddress = '0x74EEb65Fb630603E2e298a45f2cC61139594422A'; // Your token address
    const eventBettingAddress = '0xc18e4D413064CE15AFB1e451Fef46C2A9B43D64f'; // Your deployed contract address
    const [signer] = await hre.ethers.getSigners();

    // Interact with the staking token
    const StakingToken = await hre.ethers.getContractAt('IERC20', stakingTokenAddress);
    const eventBetting = await hre.ethers.getContractAt('EventBetting', eventBettingAddress);

    // Check the balance of the signer
    const balance = await StakingToken.balanceOf(signer.address);
    console.log('Signer balance:', hre.ethers.utils.formatUnits(balance, 18));

    // Check allowance for the EventBetting contract
    const allowance = await StakingToken.allowance(signer.address, eventBettingAddress);
    console.log('Allowance for EventBetting:', hre.ethers.utils.formatUnits(allowance, 18));
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
