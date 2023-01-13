describe('e2e Checkout Journey', () => {
    it('e2e purchase multiple product', () => {
      //navigate to url
      cy.visit('https://www.saucedemo.com')
      //input username and password
      cy.get('[data-test="username"]').type('standard_user').should('have.value', 'standard_user')
      cy.get('[data-test="password"]').type('secret_sauce').should('have.value', 'secret_sauce').type("{enter}")
      //verify successfully login
      cy.url().should('include', '/inventory')
  
      //add product to cart
      cy.get('[id="add-to-cart-sauce-labs-backpack"]').click()
      cy.get('[id="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
      cy.get('.shopping_cart_badge').should('have.text', '2')
  
      //open your cart page
      cy.get('.shopping_cart_link').click()
      //verify successfully open your cart page
      cy.url().should('include', '/cart')
      cy.get('.title').should('have.text', 'Your Cart')
      cy.get('.checkout_button').click()
  
      //verify successfully open input information page
      cy.url().should('include', '/checkout-step-one')
      cy.get('.title').should('have.text', 'Checkout: Your Information')
      //input your information
      cy.get('[data-test="firstName"]').type('Agus').should('have.value', 'Agus')
      cy.get('[data-test="lastName"]').type('Budiman').should('have.value', 'Budiman')
      cy.get('[data-test="postalCode"]').type('45413').should('have.value', '45413')
      cy.get('.btn_action').click()
  
      //verify successfully open preview page
      cy.url().should('include', '/checkout-step-two')
      cy.get('.title').should('have.text', 'Checkout: Overview')
      //verify details product
      cy.get('[id="item_3_title_link"]').should('have.text', 'Test.allTheThings() T-Shirt (Red)')
      cy.get('[id="item_4_title_link"]').should('have.text', 'Sauce Labs Backpack')
  
      //Payment information and Shipping information can't be verified due to same class 
  
      //verify total payment
      cy.get('.summary_subtotal_label').should('have.text', 'Item total: $45.98')
      cy.get('.summary_tax_label').should('have.text', 'Tax: $3.68')
      cy.get('.summary_total_label').should('have.text', 'Total: $49.66')
  
      cy.get('.cart_button').click()
  
      //verify successfully open complete page
      cy.url().should('include', '/checkout-complete')
      cy.get('.title').should('have.text', 'Checkout: Complete!')
  
      //verify complete page
      cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')
      cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
  
      //verify back button
      cy.get('[id="back-to-products"]').should('have.text', 'Back Home')
  
    })
  })