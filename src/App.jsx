import React, { useEffect, useState } from "react";

/* Paleta */
const COLORS = {
  primary: "#2F4F4F",
  accent: "#D4AF37",
  bg: "#FAF9F6",
  text: "#222222",
  secondary: "#EFA94A"
};

/* Productos de muestra */
const PRODUCTS = [
  { id: "PEN-001", title: "Camiseta básica unisex", category: "Niños", price: 39.9, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80&auto=format&fit=crop" },
  { id: "PEN-002", title: "Vestido floral", category: "Niñas", price: 129.0, img: "https://images.unsplash.com/photo-1520975914931-1b8a3c4f3c6c?w=1200&q=80&auto=format&fit=crop" },
  { id: "PEN-003", title: "Saco de lana elegante", category: "Caballeros", price: 249.99, img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80&auto=format&fit=crop" },
  { id: "PEN-004", title: "Blusa satinada", category: "Damas", price: 159.5, img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&q=80&auto=format&fit=crop" },
  { id: "PEN-005", title: "Pantalón casual", category: "Caballeros", price: 119.99, img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200&q=80&auto=format&fit=crop" },
  { id: "PEN-006", title: "Conjunto bebé cómodo", category: "Niños", price: 69.0, img: "https://images.unsplash.com/photo-1520975914931-1b8a3c4f3c6c?w=1200&q=80&auto=format&fit=crop" }
];

function formatPrice(p){ return `S/ ${p.toFixed(2)}`; }

export default function App(){
  const [route, setRoute] = useState("home");
  const [category, setCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState(()=> JSON.parse(localStorage.getItem("negocios_ayde_cart")||"[]"));
  const [dark, setDark] = useState(false);

  useEffect(()=>{
    localStorage.setItem("negocios_ayde_cart", JSON.stringify(cart));
  },[cart]);

  useEffect(()=>{
    document.documentElement.style.background = COLORS.bg;
    document.documentElement.style.color = COLORS.text;
  },[]);

  const filtered = PRODUCTS.filter(p=>{
    const q = query.trim().toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q);
    const matchC = category === "Todas" || p.category === category;
    return matchQ && matchC;
  });

  function addToCart(product){
    setCart(c=>{
      const idx = c.findIndex(x=>x.id===product.id);
      if(idx>=0){ const nc=[...c]; nc[idx].qty+=1; return nc;}
      return [...c, {id:product.id, title:product.title, price:product.price, qty:1}];
    });
  }
  function removeFromCart(i){ setCart(c=>c.filter((_,j)=>j!==i)); }
  function changeQty(i,qty){ setCart(c=>{ const nc=[...c]; nc[i].qty=Math.max(1,qty); return nc;}); }
  function total(){ return cart.reduce((s,p)=>s+p.qty*p.price,0); }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <div className="mark">A</div>
          <div>
            <div className="brand">Negocios Ayde</div>
            <div className="tag">Moda para toda la familia</div>
          </div>
        </div>
        <nav className="nav">
          <button onClick={()=>setRoute("home")}>Inicio</button>
          <button onClick={()=>setRoute("shop")}>Tienda</button>
          <button onClick={()=>setRoute("about")}>Nosotros</button>
          <button onClick={()=>setRoute("location")}>Ubicación</button>
          <button onClick={()=>setRoute("blog")}>Blog</button>
          <button onClick={()=>setRoute("contact")}>Contacto</button>
          <button className="cta" onClick={()=>setRoute("cart")}>Carrito ({cart.reduce((s,p)=>s+p.qty,0)})</button>
        </nav>
      </header>

      <main className="container">
        {route==="home" && (
          <section>
            <div className="hero">
              <h1>Moda para toda la familia</h1>
              <p>Calidad, estilo y confianza en cada prenda.</p>
              <div className="hero-cta">
                <button onClick={()=>setRoute("shop")} className="primary">Ver tienda</button>
              </div>
            </div>

            <h3>Colección destacada</h3>
            <div className="grid">
              {PRODUCTS.slice(0,4).map(p=>(
                <article key={p.id} className="card">
                  <img src={p.img} alt={p.title} />
                  <div className="card-body">
                    <h4>{p.title}</h4>
                    <div className="price">{formatPrice(p.price)}</div>
                    <button onClick={()=>addToCart(p)} className="primary small">Agregar</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {route==="shop" && (
          <section>
            <div className="shop-header">
              <h2>Tienda</h2>
              <div className="filters">
                <input placeholder="Buscar..." value={query} onChange={e=>setQuery(e.target.value)} />
                <select value={category} onChange={e=>setCategory(e.target.value)}>
                  <option>Todas</option>
                  <option>Niños</option>
                  <option>Niñas</option>
                  <option>Damas</option>
                  <option>Caballeros</option>
                </select>
              </div>
            </div>
            <div className="grid">
              {filtered.map(p=>(
                <div key={p.id} className="card">
                  <img src={p.img} alt={p.title} />
                  <div className="card-body">
                    <h4>{p.title}</h4>
                    <div className="price">{formatPrice(p.price)}</div>
                    <div className="actions">
                      <button onClick={()=>addToCart(p)} className="primary small">Agregar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {route==="cart" && (
          <section>
            <h2>Carrito</h2>
            {cart.length===0 ? <p>Tu carrito está vacío.</p> : (
              <div>
                <table className="cart-table">
                  <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th><th></th></tr></thead>
                  <tbody>
                    {cart.map((p,i)=>(
                      <tr key={i}>
                        <td>{p.title}</td>
                        <td><input type="number" value={p.qty} onChange={e=>changeQty(i,Number(e.target.value))} /></td>
                        <td>{formatPrice(p.price)}</td>
                        <td>{formatPrice(p.price*p.qty)}</td>
                        <td><button onClick={()=>removeFromCart(i)}>Eliminar</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="cart-summary">
                  <div>Total: <strong>{formatPrice(total())}</strong></div>
                  <div><button onClick={()=>alert("Pago simulado. Más adelante integraremos pasarelas de pago.")} className="primary">Pagar</button></div>
                </div>
              </div>
            )}
          </section>
        )}

        {route==="about" && (
          <section>
            <h2>Nosotros</h2>
            <p><strong>Negocios Ayde</strong> es una tienda familiar en Amazonas, Perú, dedicada a ofrecer moda cómoda y elegante para toda la familia. Nuestro enfoque es calidad, diseño y servicio cercano.</p>
          </section>
        )}

        {route==="location" && (
          <section>
            <h2>Ubicación</h2>
            <p>Nuestra tienda física está en <strong>Amazonas, Perú</strong>. Próximamente compartiremos la dirección exacta para retiros en tienda.</p>
            <div className="map-placeholder">[Mapa genérico - Amazonas, Perú]</div>
          </section>
        )}

        {route==="contact" && (
          <section>
            <h2>Contacto</h2>
            <p>Para consultas contáctanos por WhatsApp: <a href="https://wa.me/51951215589" target="_blank" rel="noreferrer">+51 951215589</a></p>
            <form onSubmit={(e)=>{ e.preventDefault(); alert('Formulario enviado (simulado). Revisar Netlify Forms para producción.'); }}>
              <input name="name" placeholder="Nombre" required />
              <input name="email" placeholder="Email" required />
              <textarea name="message" placeholder="Mensaje" required />
              <button className="primary">Enviar</button>
            </form>
          </section>
        )}

        {route==="blog" && (
          <section>
            <h2>Blog</h2>
            <p>Historias, consejos y novedades — próximamente.</p>
          </section>
        )}

        <footer className="footer">
          <div>© {new Date().getFullYear()} Negocios Ayde</div>
          <div className="footer-links">
            <a href="#" onClick={(e)=>{e.preventDefault(); setRoute("policies");}}>Políticas</a>
          </div>
        </footer>
      </main>

      {/* WhatsApp floating button */}
      <a className="whatsapp" href="https://wa.me/51951215589?text=Hola%20Negocios%20Ayde%20-%20Tengo%20una%20consulta" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48a11.88 11.88 0 00-16.8 0 11.89 11.89 0 000 16.8L3 21l1.74-.46A11.89 11.89 0 0020.52 3.48z"/></svg>
      </a>
    </div>
  );
}
