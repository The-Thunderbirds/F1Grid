pub fun main(account: Address) {
    let accountRef = getAccount(account)

    // Get all capabilities of the account
    let capabilities = accountRef.publicPaths

    log(capabilities)
}