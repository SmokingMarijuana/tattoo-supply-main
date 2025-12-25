import React from 'react'
import { getCart } from '../../services/cart'

const Cart = () => {
  const items = typeof window !== 'undefined' ? getCart() : []
  return (
    <div style={{ padding: '1.5rem' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span>Carrello</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>
      </h1>

      <div style={{ marginTop: '1rem' }}>
        {items.length === 0 ? (
          <p>Il carrello è vuoto.</p>
        ) : (
          <ul>
            {items.map((it) => (
              <li key={it.id}>{it.id} — Quantità: {it.qty}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Cart