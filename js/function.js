/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var user_id = localStorage.getItem('user_id');
var shopping_item_list = 'itemList' + user_id;
var product_added =0;


function matchBarcode(barcode)
{

    var barcode = barcode;
    var retrievedObject = localStorage.getItem('newdatabase');
    var rows = JSON.parse(retrievedObject);
    var rowscount = rows.length;
    var colbarcode = "";

    var barcode2 = "0" + barcode;
    var barcode3 = "00" + barcode;
	
	var productfound =0;

    for (i = 0; i < rowscount; i++)
    {
        if ((rows[i].barcode == barcode) || (rows[i].upc == barcode) || (rows[i].barcode == barcode2) || (rows[i].upc == barcode2) || (rows[i].barcode == barcode3) || (rows[i].upc == barcode3))
        {
            var productid = rows[i].id;
            var itemnumber = rows[i].item_number;
            var productname = rows[i].name;

            $("#dlg_productid").val(productid);
            $("#dlg_productname").val(productname);
            $("#dlg_itemnumber").val(itemnumber);
            $("#dlg_product_name_text").html(productname);
            $("#dlg_quantity").val(1);

            $("#lnkDialog").click();
            $('#barcode_manual').val("");
            document.getElementById("barcode_manual").focus();
			productfound=1;
            break;
        }


    }
	if(productfound==0)
	{
	$('<div class=\"alert alert-warning\">   Item Not Found.</div>').insertBefore('#add_product_success_message').delay(500).fadeOut();

		
	}

}

/***Adding Item***********/

var addItem = function (id, name, itemnumber, quantity)
{
    var user_id = localStorage.getItem('user_id');
    var shopping_item_list = 'itemList' + user_id;
    /****Quantity Validation***/
	var quantity=parseInt(quantity);
	if(quantity==0 || quantity<1)
	{
		alert("Incorrect Quantity");
		product_added=0;

		
	}
    else if(quantity>10)
    {
        var prompt = confirm("Are you sure you want to add "+quantity+" quantity?");
        if(prompt)
        {

            /***********/

    var oldItems = JSON.parse(localStorage.getItem(shopping_item_list)) || [];
    product_added=1;

    var newItem =
            {
                'id': id,
                'name': name,
                'itemnumber': itemnumber,
                'quantity': quantity,
            };

    oldItems.push(newItem);
    localStorage.setItem(shopping_item_list, JSON.stringify(oldItems));

            /**********/
        }
        else
        {
                    product_added=0;

        }
    }
	else
	{
		
		
      

    var oldItems = JSON.parse(localStorage.getItem(shopping_item_list)) || [];
	product_added=1;

    var newItem =
            {
                'id': id,
                'name': name,
                'itemnumber': itemnumber,
                'quantity': quantity,
            };

    oldItems.push(newItem);
    localStorage.setItem(shopping_item_list, JSON.stringify(oldItems));
	}

};


function addProduct()
{
    productid = $("#dlg_productid").val();
    productname = $("#dlg_productname").val();
    itemnumber = $("#dlg_itemnumber").val();
    quantity = $("#dlg_quantity").val();
    addItem(productid, productname, itemnumber, quantity);
	if(product_added==1)
	{
    $('<div class=\"alert alert-success\">  <strong>Success!</strong> Successfully Product Added.</div>').insertBefore('#add_product_success_message').delay(3500).fadeOut();
	}

}







function addProductToCart()
{
    var productid = document.getElementById("productid").value;
    var itemnumber = document.getElementById("itemnumber").value;
    var productname = document.getElementById("productname").value;
    var quantity = document.getElementById("quantity").value;
    addItem(productid, productname, itemnumber, quantity);
    alert("Product Added.");

}

function showOrderList()
{
    var user_id = localStorage.getItem('user_id');
    var shopping_item_list = 'itemList' + user_id;



    var oldItems = JSON.parse(localStorage.getItem(shopping_item_list)) || [];
    var ItemCount = oldItems.length;



    $('#contributionList').empty();
    for (i = 0; i < ItemCount; i++)
    {
        var text = "'" + i + "','" + oldItems[i].name + "','" + oldItems[i].quantity + "','" + oldItems[i].itemnumer + "'";

        $('#contributionList').append('<li><a onclick="orderDetails(' + text + ')"><h3>' + oldItems[i].name + '</h3> Quantity: ' + oldItems[i].quantity + '</a></li>').listview('refresh');
    }
}

function orderDetails(rowid, product_name, product_quantity, itemnumber)
{
    $("#dlg_shoppingcartupdate_text").html(product_name);
    $("#dlg_shoppingcartupdate_quantity").val(product_quantity);
    $("#dlg_rowid").val(rowid);
    $("#lnkDialog3").click();


}
function deleteorderitem()
{
    var user_id = localStorage.getItem('user_id');
    var shopping_item_list = 'itemList' + user_id;


    var rowid = $("#dlg_rowid").val();
    rowid = parseInt(rowid);
    var oldItems = JSON.parse(localStorage.getItem(shopping_item_list)) || [];
    var ItemCount = oldItems.length;



    for (i = 0; i < ItemCount; i++)
    {
        if (i == rowid) {
            oldItems.splice(i, 1);
            break;
        }
    }

    localStorage.setItem(shopping_item_list, JSON.stringify(oldItems));

    showOrderList();



}

// clearCart

function clearCart()
{
    var user_id = localStorage.getItem('user_id');
    var shopping_item_list = 'itemList' + user_id;
	localStorage.setItem(shopping_item_list, 'null');
    showOrderList();

	
}

function updateProductquantity()
{
    var user_id = localStorage.getItem('user_id');
    var shopping_item_list = 'itemList' + user_id;


    var rowid = $("#dlg_rowid").val();
    var quantity = $("#dlg_shoppingcartupdate_quantity").val();
    rowid = parseInt(rowid);

    var oldItems = JSON.parse(localStorage.getItem(shopping_item_list)) || [];
    var ItemCount = oldItems.length;

    for (i = 0; i < ItemCount; i++)
    {
        if (i == rowid)
        {
            oldItems[i].quantity = quantity;
            break;
        }
    }

    localStorage.setItem(shopping_item_list, JSON.stringify(oldItems));
    showOrderList();




}


/***************DATA UPDATE*******************/

var myVar;
function updateDatabase()
{ 



											var retrievedObject = localStorage.getItem('newdatabase');
                                            var rows = JSON.parse(retrievedObject);
                                            var start = rows.length;
											
											
											
											/***/
											
											    var oldItems = JSON.parse(localStorage.getItem('newdatabase')) || [];
    product_added=1;

    


	
	
											
 
						var dataFound=0;
                            $.getJSON("http://tylercstore.com/updateapps.php?start="+start+"&sessionid="+ localStorage.getItem('sessionid'), function (data) {
                                var items = [];
                                $.each(data, function (key, val)
                                {
									
									var newItem =
												{
													'id': val.id,
													'name': val.name,
													'item_number': val.item_number,
													'barcode': val.barcode,
													'upc' :val.upc
												};

												oldItems.push(newItem);
												localStorage.setItem('newdatabase', JSON.stringify(oldItems));

									dataFound=1;

									
                                });

                            });
							

							
	
							
							 var retrievedObject = localStorage.getItem('newdatabase');
                                            var rows = JSON.parse(retrievedObject);
                                            var start = rows.length;

		
		
							


					$("#updateStatus").append("Current Total Item:<b>"+start+"</b><br>");
					if(dataFound==0)
					{
						        clearInterval(myVar);
							 $("#updateStatus").append("Current Total Item:<b>"+start+"</b>");
							$("#updateStatus").append("<p>Update Completed.</p>");
	
								return;

					}

 }
 
 function updateOldDB()
 {
	 updateDatabase();
	myVar = setInterval(updatedatabase, 10000);
	 
	   

 }
	
	












