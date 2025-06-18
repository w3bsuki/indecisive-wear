'use client'

export default function TestPage() {
  return (
    <div style={{
      background: 'linear-gradient(45deg, #ff0000, #00ff00)',
      padding: '50px',
      margin: '20px',
      color: 'white',
      fontSize: '24px',
      textAlign: 'center',
      border: '5px solid blue'
    }}>
      <h1>EMERGENCY TEST PAGE</h1>
      <p>If you see this with colors, React is working</p>
      <div className="bg-blue-500 text-white p-4 rounded m-4">
        This should be blue if Tailwind works
      </div>
      <div className="bg-red-500 text-white p-4 rounded m-4">
        This should be red if Tailwind works
      </div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded m-4">
        This should be purple to pink gradient if Tailwind works
      </div>
    </div>
  )
}