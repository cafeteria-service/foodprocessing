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
   // Get HTML head element 
        var head = document.getElementsByTagName('HEAD')[0];  
  
        // Create new link Element 
        var link = document.createElement('link'); 
  
        // set the attributes for link element  
        link.rel = 'stylesheet';  
      
        link.type = 'text/css'; 
      
        link.href = 'menu.css';  
  
        // Append link element to HTML head 
        head.appendChild(link);  
  
  var rootRef = firebase.database().ref().child("coffee");
var name;
var price;
var id;


rootRef.on("child_added",snap => {
    
    name =snap.child("name").val();
    price =snap.child("price").val();
    
        id=name.toString().replace(/\s/g,'_').toLowerCase();
        
    
  //  console.log("Name array=> "+name);
   // console.log("id array=> "+id);
   // console.log("id price==>"+price);
   // console.log("name="+name);
   // console.log("price="+price);
    
    $("#tid").append("<div style='margin-top:30px;margin-bottom:30px;'><div class='menu-item-name'>" +name+"</div><div class='menu-item-price'>" +price+"</div><div class='box'><input type='number' id='id"+id+"Count' value=0> </div><div class='box1'><button class='button1' onClick='addToCart()'>Add to cart</button></div></div>");
    
});
  

var cold_coffee_ref = firebase.database().ref().child("coldcoffee");
var name1;
var price1;
var id1;


cold_coffee_ref.on("child_added",snap => {
    
    name1 =snap.child("name").val();
    price1=snap.child("price").val();
    
        id1=name1.toString().replace(/\s/g,'_').toLowerCase();
        
    
  //  console.log("Name array=> "+name);
   // console.log("id array=> "+id);
   // console.log("id price==>"+price);
   // console.log("name="+name);
   // console.log("price="+price);
    
    $("#tid1").append("<div style='margin-top:30px;margin-bottom:30px;'><div class='menu-item-name'>" +name1+"</div><div class='menu-item-price'>" +price1+ "</div><div class='box'><input type='number' id='id"+id1+"Count' value=0> </div><div class='box1'><button class='button1' onClick='addToCart1()'>Add to cart</button> </div></div>");
    
});


function addToCart(){
 
 var coffee_id;
 var itemid;
 var cname;
 var quantity;
 var price;
 var orders=[];
  var order={};
 var user="Janhavi";
 var rootRef1 = firebase.database().ref().child("coffee");
 
 rootRef1.on("child_added",snap => {
    cname=snap.child("name").val();
    coffee_id=cname.toString().replace(/\s/g,'_').toLowerCase();
    itemid="id"+coffee_id+"Count";
    console.log(itemid);
    quantity=document.getElementById(itemid).value;
    price=snap.child("price").val().toString();
    console.log(price);
    console.log(quantity);
    
     for(i=0;i<quantity.length;i++){
         temp1=cname
        if(quantity[i]>0){
            order={
                name:cname,
                quantity:quantity[i],
                price:price
            };
            var temp=orders.push(order);
            console.log("orders count======================================"+temp);
            console.log("Orders=======================================price"+order.price+", name="+order.name+", quantity="+order.quantity);
            id=itemid;
            console.log("id of previously set item"+id);
            document.getElementById(id).value =0
            }
    }
});
console.log(user);
            createOrder(user,orders);
            
            alert("Sucessfully Entered.");

}

function addToCart1(){
 
 var coffee_id;
 var itemid;
 var cname;
 var quantity;
 var price;
 var orders=[];
  var order={};
 var user="Janhavi";
 var rootRef1 = firebase.database().ref().child("coldcoffee");
 
 rootRef1.on("child_added",snap => {
    cname=snap.child("name").val();
    coffee_id=cname.toString().replace(/\s/g,'_').toLowerCase();
    itemid="id"+coffee_id+"Count";
    console.log(itemid);
    quantity=document.getElementById(itemid).value;
    price=snap.child("price").val().toString();
    console.log(price);
    console.log(quantity);
    
     for(i=0;i<quantity.length;i++){
         temp1=cname
        if(quantity[i]>0){
            order={
                name:cname,
                quantity:quantity[i],
                price:price
            };
            var temp=orders.push(order);
            console.log("orders count======================================"+temp);
            console.log("Orders=======================================price"+order.price+", name="+order.name+", quantity="+order.quantity);
            id=itemid;
            console.log("id of previously set item"+id);
            document.getElementById(id).value =0
            
        }
    }
});
console.log(user);
            createOrder(user,orders);
            alert("Sucessfully Entered.");
}
function createOrder(user,order){
      console.log("User in createOrder=  "+user);
      console.log("Order in createOrder=  "+order);
     
    firebase.database().ref(`cart/${user}`).once("value", snapshot => {
   if (snapshot.exists()){
      console.log("exists!");
      updateToCart(user,order);
   }
   else
   {
      let db = firebase.database().ref("cart/"+user);
      db.set(order);
   }
});
      //let db = firebase.database().ref("cart/"+user);
      //db.set(order);
  }
function updateToCart(user,newItem){
    var currentItems=[];
    let p;
    itemref=firebase.database().ref("cart/"+user);
    p=firebase.database().ref("cart/"+user+"/");
        console.log("value of p=====",p);
    itemref.once('value',snap=>{
        console.log("update to cart walaga")
        if(snap.exists())currentItems=snap.val();
        console.log(newItem);
        currentItems=currentItems.concat(newItem);
        console.log("whole list",currentItems);
        
        p.remove();
        itemref.set(currentItems);
    });
}