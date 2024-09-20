import { ethers } from 'hardhat'
import { ContractFactory, Contract, Overrides } from 'ethers'


export async function deployContract(
    contractName: string,
    signer: any,
    constructorArgs: any[] = [],
    overrides?: Overrides
): Promise<Contract> {
    const factory: ContractFactory = await ethers.getContractFactory(contractName)
    const connectedFactory: ContractFactory = factory.connect(signer)

    let deploymentArgs = [...constructorArgs]
    if (overrides) {
        deploymentArgs.push(overrides)
    }

    const contract: Contract = await connectedFactory.deploy(...deploymentArgs)
    await contract.deployTransaction.wait()
    console.log(`New ${contractName} created at address:`, contract.address)

    return contract
}


export async function main() {
    const [signer] = await ethers.getSigners()
    const arbOSUpgrade = await deployContract('UpgradeArbOSVersionAtTimestampAction', signer, [33, 1726765345])
}

main()
    .then(() => process.exit(0))
    .catch((error: Error) => {
        console.error(error)
        process.exit(1)
    })