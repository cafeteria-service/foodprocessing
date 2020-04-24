/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

  var firebaseConfig = {
    apiKey: "AIzaSyAcM3wkkq3YlraB5HMmVzPtafBNxcSZQoY",
    authDomain: "miniproject-9dee1.firebaseapp.com",
    databaseURL: "https://miniproject-9dee1.firebaseio.com",
    projectId: "miniproject-9dee1",
    storageBucket: "miniproject-9dee1.appspot.com",
    messagingSenderId: "410539804770",
    appId: "1:410539804770:web:d8af45223668059336e93b",
    measurementId: "G-NT4LQEJF7J"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let i=0;
var cart = firebase.database().ref().child("cart").child("Janhavi");
var itemname;
var itemquantity;
var itemprice;
var sum=0;
var count=0;
var arr=[];
//var cart_price = firebase.database().ref().child("coffee");

cart.on("child_added",snap1 => {
    console.log("in cart condition , check_count=");
    // cart_price.on("child_added",snap => {
    itemprice=snap1.child("price").val();
    
    itemname =snap1.child("name").val();
    count=snap1.child("price");
    
    
    itemquantity =snap1.child("quantity").val();
    console.log("name="+itemname);
     console.log("quantity="+itemquantity);
     console.log("price="+itemprice);
     var minisum=itemprice*itemquantity;
    sum=sum+minisum;
  
    i++;
   
     $("#cartid").append("<tr><td>" +itemname+"</td><td>" +itemquantity+ "</td><td>" +itemprice+ " </td><td>"+minisum+"</td><td> <button onclick='removefromcart(this.id)' id='idremove+"+i+"' value="+i+">Remove</button></td></tr>");
    
    });
    
    function totalAmount(){
    console.log("total sum===>"+sum);
     $("#td").append("  "+sum);
     const button = document.getElementById('idTotalAmount')
        button. disabled = true
  
}
   

function proceedToOrder(){
   
    var tableId=prompt("Enter Your Table Id:","");
}


function removefromcart(button_id){
    var currentItems=[];
    var user="Janhavi";
    console.log("In the remove from cart");
    let userRef = firebase.database().ref("cart/"+user+"/"+(button_id[button_id.length-1]-1));
    console.log("userref............"+userRef);
    console.log("i==================="+button_id[button_id.length-1]);
    userRef.remove();
    itemref=firebase.database().ref("cart/"+user);
    itemref.once('value',snap=>{
       
        if(snap.exists())currentItems=snap.val();
    });
    console.log("currentItems===="+currentItems);
    var items=currentItems.filter(function (e1){
        return e1!=null;
    });
    
    
     
    console.log("Items===="+items);
    let userRefOld = firebase.database().ref("cart/"+user);
    userRefOld.set(null);
    
    alert("Sucessfully deleted.");
    ref1=firebase.database().ref("cart/"+user);
    ref1.set(items);
    location.reload(true);
}

function reset_items(user,currentItems){
    let userRef = firebase.database().ref("cart/"+user);
    userRef.remove()
    
    let db = firebase.database().ref("cart/"+user);
      db.set(currentItems);
}


    