const defaultConfig = {
  "whatsapp": "94787533889",
  "menu": [
    {
      "id": 1,
      "name": "Chicken Kottu",
      "category": "KOTHTHU",
      "price": "950",
      "description": "Chopped roti tossed with chicken, vegetables and aromatic spices.",
      "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 2,
      "name": "chicken rice & curry",
      "category": "RICE & CURRY",
      "price": "450",
      "description": "Soft steamed string hoppers served with tasty accompaniments.",
      "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 1795025074607,
      "name": "chiken rice",
      "category": "RICE",
      "price": "0",
      "description": "",
      "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 1795025094539,
      "name": "egg rice",
      "category": "RICE",
      "price": "0",
      "description": "",
      "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 1795025158964,
      "name": "vagetable rice",
      "category": "RICE",
      "price": "0",
      "description": "",
      "image": "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 1795025229171,
      "name": "egg koththu",
      "category": "KOTHTHU",
      "price": "0",
      "description": "",
      "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 1795025233025,
      "name": "chicken biriyani",
      "category": "BIRIYANI",
      "price": "0",
      "description": "",
      "image": "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 1795025388319,
      "name": "fish rice & curry",
      "category": "RICE & CURRY",
      "price": "0",
      "description": "",
      "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 1795025390486,
      "name": "vage rice & curry",
      "category": "RICE & CURRY",
      "price": "0",
      "description": "",
      "image": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 1795025391941,
      "name": "egg rice & curry",
      "category": "RICE & CURRY",
      "price": "0",
      "description": "",
      "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
    }
  ]
};
let config = loadConfig();
let activeCategory = "All";
const $ = id => document.getElementById(id);
function loadConfig(){try{return JSON.parse(localStorage.getItem("tamilFoodConfig_v2"))||structuredClone(defaultConfig)}catch{return structuredClone(defaultConfig)}}
function saveLocal(){localStorage.setItem("tamilFoodConfig_v2",JSON.stringify(config))}
function waLink(message){const number=(config.whatsapp||"").replace(/\D/g,"");return `https://wa.me/${number}?text=${encodeURIComponent(message)}`}
function render(){
 const cats=["All",...new Set(config.menu.map(x=>x.category).filter(Boolean))];
 $("categories").innerHTML=cats.map(c=>`<button class="category ${c===activeCategory?"active":""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");
 const q=$("search").value.toLowerCase();
 const items=config.menu.filter(x=>(activeCategory==="All"||x.category===activeCategory)&&(`${x.name} ${x.description} ${x.category}`).toLowerCase().includes(q));
 $("menu-grid").innerHTML=items.length?items.map(x=>`<article class="dish"><img src="${escapeAttr(x.image||"")}" alt="${escapeAttr(x.name)}" loading="lazy" onerror="this.style.display='none'"><div class="dish-body"><div class="dish-title"><h3>${escapeHtml(x.name)}</h3><span class="price">Rs. ${escapeHtml(x.price)}</span></div><p>${escapeHtml(x.description||"")}</p><button onclick="orderDish(${Number(x.id)})">Order on WhatsApp</button></div></article>`).join(""):'<p class="empty">No dishes found. Try another search.</p>';
 document.querySelectorAll("[data-cat]").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.cat;render()}));
}
function orderDish(id){const item=config.menu.find(x=>x.id===id);if(item)window.open(waLink(`Hello TAMIL FOOD! I would like to order: ${item.name} - Rs. ${item.price}`),"_blank")}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function escapeAttr(s=""){return escapeHtml(s)}
$("search").addEventListener("input",render);
$("order-all").href=waLink("Hello TAMIL FOOD! I would like to place an order.");
$("year").textContent=new Date().getFullYear();
render();
const panel=$("admin-panel");
function renderAdmin(){
 $("wa-number").value=config.whatsapp;
 $("admin-items").innerHTML=config.menu.map((x,i)=>`<div class="admin-item" data-index="${i}">
 <input data-field="name" value="${escapeAttr(x.name)}" placeholder="Dish name">
 <input data-field="category" value="${escapeAttr(x.category)}" placeholder="Category">
 <input data-field="price" value="${escapeAttr(x.price)}" placeholder="Price">
 <input data-field="image" value="${escapeAttr(x.image)}" placeholder="Image URL">
 <button class="remove" type="button" data-remove="${i}">Delete</button>
 <textarea data-field="description" placeholder="Description">${escapeHtml(x.description||"")}</textarea></div>`).join("");
 document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{config.menu.splice(Number(b.dataset.remove),1);renderAdmin()});
}
function openAdmin(){panel.hidden=false;renderAdmin()}
if(new URLSearchParams(location.search).get("admin")==="1")openAdmin();
$("close-admin").onclick=()=>{panel.hidden=true};
$("add-item").onclick=()=>{config.menu.push({id:Date.now(),name:"New dish",category:"Main dishes",price:"0",description:"",image:""});renderAdmin()};
$("save-settings").onclick=()=>{
 config.whatsapp=$("wa-number").value.trim();
 document.querySelectorAll(".admin-item").forEach(row=>{const item=config.menu[Number(row.dataset.index)];row.querySelectorAll("[data-field]").forEach(el=>item[el.dataset.field]=el.value.trim())});
 saveLocal();render();$("admin-message").textContent="Saved in this browser successfully.";
};
$("export-settings").onclick=()=>{
 const data=new Blob([JSON.stringify(config,null,2)],{type:"application/json"});
 const a=document.createElement("a");a.href=URL.createObjectURL(data);a.download="tamil-food-settings.json";a.click();URL.revokeObjectURL(a.href);
};
$("import-settings").onchange=async e=>{
 const file=e.target.files[0];if(!file)return;
 try{const data=JSON.parse(await file.text());if(!Array.isArray(data.menu)||typeof data.whatsapp!=="string")throw Error();config=data;renderAdmin();$("admin-message").textContent="Settings loaded. Press Save changes to apply."}
 catch{$("admin-message").textContent="Invalid settings file. Please choose a valid exported JSON file."}
 e.target.value="";
};
$("reset-settings").onclick=()=>{if(confirm("Reset the menu and WhatsApp number to sample settings?")){config=structuredClone(defaultConfig);saveLocal();renderAdmin();render();$("admin-message").textContent="Menu restored."}};
