var name=null;
var age =null;
var address=null;
var mail=null;
var subject=null;

function prepare_for_edit()
{

    document.getElementById("1name").value=name;
    document.getElementById("1age").value=age;
    document.getElementById("1address").value=address;
    document.getElementById("1email").value=mail;
    document.getElementById("get1").checked=true;
}
function process_form()


{
    console.log("process form activated");  // both times

    name = document.getElementById("1name").value;
    document.getElementById("fName").innerHTML = name;

    age = document.getElementById("1age").value;
    document.getElementById("age").innerHTML = age;

    address = document.getElementById("1address").value;
    document.getElementById("add").innerHTML = address;

    mail = document.getElementById("1email").value;
    document.getElementById("emailout").innerHTML = mail;

    subject=send_radio();

}


function send_radio () {
    const ele = document.getElementsByName('order');

    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
            document.getElementById("radio1out").innerHTML
                = "type: "+ele[i].value;
    }
    send_clear();

}



function send_clear() {

    document.getElementById("1name").value="";
    document.getElementById("1age").value="";
    document.getElementById("1address").value="";
    document.getElementById('get1').checked = true;
    document.getElementById("1email").value="";

}


//________VALIDATION start______


// this function will validate email field using regular expression(regx)- basic format of an possible email address.
function validate_email(email)
{
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))
    {
        return true;
    }
    return false;
}

// this function will validate firstname and lastname using regular expression(regx)- basic format of a possible name.
function validate_fullname(name)
{
    if(/^[a-zA-Z]+ [a-zA-Z]+$/.test(name))
    {
        return true;
    }
    return false;
}

// this function will validate firstname and lastname using regular expression(regx)- basic format of a possible name.
function validate_address(address)
{
    if(/^[a-zA-Z0-9\s,.'-]{3,}$/.test(address))
    {
        return true;
    }
    return false;
}


function validate_age_number(age)
{

    if(Number.isInteger(parseInt(age)) )
    {
        if(age > 0 && age <= 120)
        {
            return true;
        }
        return false;
    }
    else
    {
        return false;
    }
}

function validate_info()
{
    console.log("validate started");
    let fullname_correct = validate_fullname(document.getElementById("1name").value);

    let email_correct = validate_email(document.getElementById("1email").value);

    let address_correct = validate_address(document.getElementById("1address").value);

    let age_correct = validate_age_number(parseInt(document.getElementById("1age").value));

    console.log(fullname_correct+" "+address_correct+" "+email_correct+" "+age_correct);

    let str_fullname  = " | Full Name | ";
    let str_email  = " | Email Address | ";
    let str_address  = " | Address | ";
    let str_age  = " | age | ";

    let statement = "";
    let count=0;


    if(fullname_correct==true && address_correct==true && email_correct==true && age_correct==true)
    {
        console.log("calling process_form");
        process_form();


    }
    else
    {
        if(fullname_correct==false && (document.getElementById("1name").value==""|| document.getElementById("1name").value==null))
        {
            statement+=str_fullname;
            count+=1;
        }

        if(address_correct==false && (document.getElementById("1address").value==""|| document.getElementById("1address").value==null))
        {
            statement+=str_address;
            count+=1;
        }

        if(email_correct==false && (document.getElementById("1email").value=="" || document.getElementById("1email").value==null))
        {
            statement+=str_email;
            count+=1;
        }

        if(age_correct==false && (document.getElementById("1age").value==""|| document.getElementById("1age").value==null))
        {
            statement+=str_age;
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
            if(fullname_correct==false)
            {
                statement+=str_fullname;
                count+=1;
            }
            if(address_correct==false)
            {
                statement+=str_address;
                count+=1;
            }

            if(email_correct==false)
            {
                statement+=str_email;
                count+=1;
            }

            if(age_correct==false)
            {
                statement+=str_age;
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


    {
        document.getElementById('toGetOut').style.display = "block";
    }



}



//______VALIDATION OVER_______