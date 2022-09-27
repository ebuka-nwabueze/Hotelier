

describe('username is valid', () => {
  it("username test", () => {
    const user = Cypress.env("username")
    expect(user,"username").to.be.a("string").and.not.be.empty

    const password = Cypress.env("password")
    assert(password, "password")
  })


})
