// javascript by Sandeepa Induwara Samaranayake sandeepa.20210302@iit.ac.lk

// get form elements as javascript objects---------------> personal details
let first_name = document.getElementById("fname");
let last_name = document.getElementById("lname");
let tel_no = document.getElementById("tel_no");
let email = document.getElementById("email");
let country  = document.getElementById("country");
let btn_place_order = document.getElementById("submit_btn");
let invoice = document.getElementById("invoice_showcase");

// get form elements as javascript objects----------------> product list

let price = document.getElementsByClassName("product-price");
let amount = document.getElementsByClassName("amount");
let quantity = document.getElementsByClassName("quantity");
let product_detail = document.getElementsByClassName("product-detail");
let product_name = document.getElementsByClassName("product-name");
let btn_order_now = document.getElementsByClassName("order_now btn btn-primary");       // get all elements with classes order_now AND btn AND btn-primary
let btn_add_to_cart = document.getElementsByClassName("add_to_cart btn btn-primary");   // get all elements with classes add_to_cart AND btn AND btn-primary

// get table element as a javascript object---------------> shopping cart

let shopping_cart_table = document.getElementById("shopping_cart_table");

// variables to hold order details--------------------------> order details
let pro_name=null;
let pro_amount=null;
let pro_price=null;
let pro_detail=null;
let total_amount=0;
let pro_total_payment=null;
let bill_total_check=false;

// event listeners defined here
btn_place_order.addEventListener("click",validate_info);          // btn_place_order button in personal details section.

// Array for items are in Catr ------------------------------> cart array
let cart_arr=[];

// this is for order now btns in products list
for(let i = 0; i < btn_order_now.length; i++) 
{
    btn_order_now[i].addEventListener("click", function()         // anonymous inner function.
    {
   
        console.log("Order Button Clicked");
        if(validate_product_amount(parseInt(amount[i].value), i)) // if user's input is not numerical then parseInt() will return a NaN - Not a Number property.
        {                                                         // if user enters a float value then parseInt() will shrink the fraction part and return an int.
            jump_to_anchor("personal_info");
            enable_text_fields();
            get_values(i);
            amount[i].value="";
        }
    });
}
// this is for add_to_cart btns in product list
for(let i = 0; i < btn_add_to_cart.length; i++) {
    btn_add_to_cart[i].addEventListener("click", function()
    {
        if(validate_product_amount(parseInt(amount[i].value), i)) // if user's input is not numerical then parseInt() will return a NaN - Not a Number property.
        {                                                         // if user enters a float value then parseInt() will shrink the fraction part and return an int.
            console.log("Add to cart Button Clicked");
            get_values(i);
            add_to_cart();
            alert("Your Item successfully added to the Shopping Cart");
            amount[i].value="";
        }
    });
   }
// this function will get all details related to the product.
function get_values(i)
{
    pro_name = product_name[i].innerHTML;   
    pro_amount = parseInt( amount[i].value );          
    pro_price = parseFloat( price[i].innerHTML.substring(1));        
    pro_detail = product_detail[i].innerHTML;
    pro_total_payment = pro_amount*pro_price; 
}

// this function will jump to a given anchor point
function jump_to_anchor(anchor)
{
    window.location.href = "#" + anchor;
}

//____________________________________________________________VALIDATION START_____________________________________________________________________________________

// this function will validate email field using regular expression(regx)- basic format of an possible email address.
function validate_email(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return true;
  }
    return false;
}

// this function will validate firstname and lastname using regular expression(regx)- basic format of a possible name.
function validate_fname_and_lname(name)
{
    if(/^[ a-zA-Z\-/']+$/.test(name))
    {
        return true;
    }
        return false;
}
// this function will validate mobile number using regular expression(regx)- basic format of a possible name.
function validate_mobile_no(mobile_number)
{ 
  if((mobile_number.match(/^\d{10}$/)))   
    {
        return true; 
    }
        return false;
}

// this function will validate the product amount is actually a number
function validate_product_amount(amount , i)
{
    // check if the entered value is a number and  the 
    let available_product_amount = quantity[i].innerText;
    console.log(Number.isInteger(amount));
    if(Number.isInteger(amount) )
    {
        if(amount > 0 && amount <= available_product_amount )
        {
            quantity[i].innerText = available_product_amount-amount;
            return true;
        }
        alert("The Entered Quantity value cannot be proceed.");
        return false;
    }
    else
    {
        alert("The Entered Value for Quantity is not Valid.");
        return false;
    }
    
}
// this function will validate the entered details for
function validate_info()
{
    let fname_correct = validate_fname_and_lname(first_name.value);
    let lname_correct = validate_fname_and_lname(last_name.value);
    let mobile_correct = validate_mobile_no(tel_no.value);
    let email_correct = validate_email(email.value);

    let str_fname  = " | First Name | ";
    let str_lname  = " | Last Name | ";
    let str_mobile = " | Mobile No | ";
    let str_email  = " | Email Address | ";

    let statement = "";
    let count=0;

    if(fname_correct==true && lname_correct==true && mobile_correct==true && email_correct==true)
    {
        console.log("Your order is processing");
        process_order();
    }
    else
    {
        if(fname_correct==false && (first_name.value==""|| first_name.value==null))
        {
                statement+=str_fname;
                count+=1;
        }
        if(lname_correct==false && (last_name.value==""|| last_name.value==null))
        {
                statement+=str_lname;
                count+=1;
        }
        if(mobile_correct==false && (tel_no.value==""|| tel_no.value==null))
        {
                statement+=str_mobile;
                count+=1;
        }
        if(email_correct==false && (email.value=="" || email.value==null))
        {
                statement+=str_email;
                count+=1;
        }
        if(count!=0)
        {
            if(count==1)
            {
                alert("The"+statement+" field is not filled.");
            }
            else
            {
                alert("The"+statement+" fields are not filled.");
            }
        }
        else
        {
            statement= "";
            count=0;
            if(fname_correct==false)
            {
                statement+=str_fname;
                count+=1;
            }
            if(lname_correct==false)
            {
                statement+=str_lname;
                count+=1;
            }
            if(mobile_correct==false)
            {
                statement+=str_mobile;
                count+=1;
            }
            if(email_correct==false)
            {
                statement+=str_email;
                count+=1;
            }
            if(count==1)
            {
                alert("The"+statement+" field is filled with invalid values.");
            }
            else if(count>1)
            {
                alert("The"+statement+" fields are filled with invalid values.");
            }
        }
    }
}
//_________________________________________________________________VALIDATION OVER__________________________________________________________________________________


//_________________________________________________________________ORDER PRODUCT START______________________________________________________________________________

// this function will disable personal details text fields 
function disable_text_fields()
{
    first_name.disabled = true;
    last_name.disabled = true;
    tel_no.disabled = true;
    email.disabled = true;
    btn_place_order.disabled = true;
}

// this function will enable personal details text fields
function enable_text_fields()
{
    first_name.disabled = false;
    last_name.disabled = false;
    tel_no.disabled = false;
    email.disabled = false;
    btn_place_order.disabled = false;
}

// this function will handle processing invoice.
function process_order()
{
    
    jump_to_anchor("invoice_h2"); // call jump_to_anchor function to send user to invoice section.                                 
    disable_text_fields();        // disable personal details text fields.

    if(invoice.innerText=="" || invoice.innerText==null)             // check whether invoice is empty or not.
    {
                invoice.innerHTML=invoice_statement_make();          // call invoice_statement_make() function to show the customer's personal details.
                process_order();                                     // call itself again.
    }
    else
    {
        total_amount+=Math.round((pro_price*pro_amount)*100)/100;    // calculate total amount of the order.
        if(invoice.innerHTML==invoice_statement_make())              // if page contains only order details then
        {
            invoice.innerHTML+=product_order_statement_with_tot();   // it will append the order details to page with total price.
        }
        else
        {       
            product_order_without_amount =invoice.innerHTML.replace(invoice.innerHTML.substring(invoice.innerHTML.indexOf('Total Bill')) , "");   // to generate an order without total price this will cut off the "Total Bill" and the latter part.
            invoice.innerHTML=product_order_without_amount+product_order_statement_with_tot()  // display the previous order details without total price and will show this order details with total price.
        }
    }
}

// this function will return a product detail with total price amount.
function product_order_statement_with_tot()
{
    product_order1="<pre>"+"Product Name -"+pro_name+"\nProduct Detail -"+pro_detail+"\nProduct Price per Piece -"+pro_price+"$"+"\nProduct Amount -"+pro_amount
                   +"\n............................................................................................................................................................................................................................................................................................."
                   +"\nTotal Bill -"+total_amount+"$\n"+"<pre>";
                
    return product_order1;
}

// this function will return a product detail without total price amount.
function product_order_statement_without_tot()
{
    product_order2="<pre>"+"Product Name -"+pro_name+"\nProduct Detail -"+pro_detail+"\nProduct Price per Piece -"+pro_price+"$"+"\nProduct Amount -"+pro_amount
                   +"\n............................................................................................................................................................................................................................................................................................."
                   +"<pre>";
                
    return product_order2;
}

// this function will return a  summary of customer details.
function invoice_statement_make()
{
    invoice_statement = "<pre>"+"First Name  -"+first_name.value+"\nLast Name  -"+last_name.value+"\nEmail Address  -"+email.value+"\nMobile No  -"+tel_no.value
    +"\ncountry  -"+country.value+"\n............................................................................................................................INVOICE DETAILS..........................................................................................................................."
    +"</pre>";

    return invoice_statement;
}
//_____________________________________________________________________ORDER PRODUCT END_________________________________________________________________________________

//_____________________________________________________________________ADD TO CART START_________________________________________________________________________________


// this function will handle the cart
function add_to_cart()
{
    console.log("add to cart activated");
    cart_arr.push([pro_name,pro_amount,pro_price,pro_detail,pro_total_payment]);    // send order details to cart_array

    console.log(cart_arr);
    show_in_cart(cart_arr.length);
}
// this function will show the order details in cart table
function show_in_cart(row_number)
{
    let row = shopping_cart_table.insertRow(row_number); // insert a new row to the table

    let cell_pro_name = row.insertCell(0);               // 0th cell will be the name of the product
    let cell_pro_amount = row.insertCell(1);             // 1st cell will be the amount of the product
    let cell_pro_price = row.insertCell(2);              // 2nd cell will be the price of the product
    let cell_pro_total_payment = row.insertCell(3);      // 3rd cell will be the total payment
    let cell_pro_detail = row.insertCell(4);             // 4th cell will be the product detail
    let cell_pro_order_now = row.insertCell(5);          // 5th cell will be a button for "Order Now"
    let cell_pro_remove_from_cart = row.insertCell(6);   // 6th cell will be a button for "remove from cart"
    
    cell_pro_name.innerHTML = pro_name;                    // set product name to product name cell.
    cell_pro_amount.innerHTML = pro_amount;                // set product amount to amount cell.
    cell_pro_price.innerHTML = pro_price;                  // set product price to price cell.
    cell_pro_total_payment.innerHTML = pro_total_payment;  // set total payment to total price cell.
    cell_pro_detail.innerHTML = pro_detail;                // set product details to details cell.

    let created_btn = create_table_btns("Order Now","table_order_now_btn");  // create order now btn
    cell_pro_order_now.append(created_btn);                                  // append order now btn to 5th cell to show in the table
    table_order_now_btn_clicked();                                           // call the function to handle the order now process.
    
    created_btn = create_table_btns("Remove Item","table_remove_item_btn");  // create remove item btn
    cell_pro_remove_from_cart.append(created_btn);                           // append remove btn to 6th cell to show in the table
    remove_from_cart();                                                      // call the function to remove the item from cart.
}
// this function will create "Order Now" button and remove from cart button.
function create_table_btns(btn_text_label,btn_class_name)
{
    let table_button = document.createElement("button");                    // creating a button type element.
    table_button.innerText = btn_text_label;                                // setting text to the button.
    table_button.className = btn_class_name;                                // setting class name to the button.
    return table_button;                                                    // returning button.
}
// this function will handle the bahaviour of "order now" buttons in the cart table.
function table_order_now_btn_clicked()
{
    let td_order_now_btn = document.getElementsByClassName("table_order_now_btn");

    for(let i = 0; i < td_order_now_btn.length; i++) 
    {
        td_order_now_btn[i].addEventListener('click', function()            // anonymous inner function.
        {
            console.log("cart table Order now Button Clicked");
            jump_to_anchor("personal_info");
            enable_text_fields();
        });
    }
}
// this function will handle the bahaviour of "remove item" buttons in the cart table
function remove_from_cart()
{

    let td_remove_item_btn = document.getElementsByClassName("table_remove_item_btn");

    for(let i = 0; i < td_remove_item_btn.length; i++) 
    {
        td_remove_item_btn[i].addEventListener("click", function()            // anonymous inner function.
        {
            
            console.log("cart table remove item Button Clicked");
            //shopping_cart_table.deleteRow(td_remove_item_btn[i].parentNode.parentNode);
            let row = td_remove_item_btn[i].parentNode.parentNode;
            console.log(row);
            row.parentNode.removeChild(row);
            delete cart_arr[i];
            console.log(cart_arr);
        });
    }
}

//_____________________________________________________________________ADD TO CART STOP__________________________________________________________________________________

// this function will run when the page loads.
document.addEventListener("DOMContentLoaded", function() 
{
    disable_text_fields();
});