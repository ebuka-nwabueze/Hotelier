

describe('Login and register a user', () => {
  const username = "test01@gmail.com"
  const password = "test321" 
  const name =  "Test User" 

  const category = "Duplicate"
  const description = "This is a duplicate for us to check our tasks, please help"

  it("register a user",  () => {
    cy.visit('/register')
    cy.findByRole('textbox', {  name: /name:/i}).type(`${name}`)
    cy.findByRole('textbox', {  name: /email:/i}).type(`${username}`)
    cy.findByPlaceholderText(/enter your password/i).type(`${password}`)
    cy.findByPlaceholderText(/confirm password/i).type(`${password}`)
    cy.findByRole('button', {  name: /register/i}).click();  
  })

  it('login to page', () => {
    cy.visit('/login')
    cy.findByRole('textbox', {  name: /email:/i}).type(`${username}`)
    cy.findByLabelText(/password:/i).type(`${password}`)
    cy.findByRole('button', {  name: /login/i}).click();
  })

  it("Create new ticket", () => {
    cy.get('[test-id="new-ticket-link"] > a').click()
    cy.get('#category').select(`${category}`)
    cy.get('#description').type(`${description}`)
    cy.get('.btn').click()
  })


})

describe("View , update and delete Ticket", () => {
  const category = "Duplicate"
  const description = "This is a duplicate for us to check our tasks, please help"
  const newDescription = "The success of the resolved tickets made it possible"
  const newCategory = "Image Error"

  it("view ticket", () => {
    cy.get(':nth-child(2) > .btn-main').click()
    cy.findByText(description).should("be.visible")
  })

  it("Update ticket", () => {
    cy.findByRole('button', {  name: /update/i}).click()
    cy.findByRole('combobox', {  name: /category:/i}).select(newCategory)
    cy.findByRole('textbox', {  name: /description:/i}).clear()
    cy.findByRole('textbox', {  name: /description:/i}).type(newDescription)
    cy.findByRole('button', {  name: /update/i}).click()
    cy.findByText(newDescription).should("be.visible")
  })

  it("Delete ticket", () => {
    cy.findByRole('button', {  name: /delete/i}).click()
  })

})