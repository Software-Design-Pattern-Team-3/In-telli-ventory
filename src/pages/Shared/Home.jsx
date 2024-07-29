import React from 'react';
import LetterPullup from '@/components/magicui/letter-pullup';
import { BorderBeam } from '@/components/magicui/border-beam';

const Home = () => {
  const bodyStyle = {
    width: '100vw',
    height: '200vh',
    padding: '1rem',
    fontFamily: 'Avenir, sans-serif',
    fontSize: '112.5%',
    color: '#333',
    backgroundImage: `
      url('https://example.com/inventory-management-image1.jpg'),
      url('https://example.com/inventory-management-image2.jpg'),
      radial-gradient(rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0) 40vw),
      radial-gradient(rgba(0, 255, 0, 0.3), rgba(0, 255, 0, 0) 40vw),
      radial-gradient(rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0) 40vw),
      radial-gradient(rgba(255, 255, 0, 0.3), rgba(255, 255, 0, 0) 40vw),
      radial-gradient(rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0) 40vw)
    `,
    backgroundPosition: `
      center center,
      center center,
      -40vw 14rem,
      50% 10rem,
      60vw 14rem,
      -10vw calc(14rem + 20vw),
      30vw calc(14rem + 20vw)
    `,
    backgroundSize: `
      cover,
      cover,
      80vw 80vw
    `,
    backgroundRepeat: 'no-repeat',
    animation: 'backgroundAnimation 15s infinite alternate',
  };

  const headerStyle = {
    maxWidth: '600px',
    margin: '24vh auto',
    textAlign: 'center',
    animation: 'headerAnimation 2s ease-in-out',
  };

  const h1Style = {
    fontSize: '3.2rem',
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#222',
  };

  const mainStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem',
  };

  const cardsStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: '-1rem',
    listStyle: 'none',
    gap: '1rem',
  };

  const cardStyle = {
    flex: 1,
    margin: '1rem',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    animation: 'cardAnimation 3s infinite alternate',
  };

  const cardImageStyle = {
    fontSize: '2rem',
    lineHeight: 1,
    marginBottom: '1rem',
    animation: 'iconDance 2s infinite',
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={bodyStyle}>
      <div className="relative flex h-[10rem] w-full items-center justify-center absolute top-20 right-12 overflow-hidden ">
        <LetterPullup words={"Hello Everyone, Welcome to My INV_Toby ✨"} delay={0.05} />
      </div>
      <header style={headerStyle}>
        <h1 style={h1Style}>
          <LetterPullup words={"Dream big, manage inventory bigger."} delay={0.05} />
        </h1>
        <p>Success in inventory management is not about having the most, but having what you need, when you need it...</p>
      </header>
      <main style={mainStyle}>
        <ul style={cardsStyle}>
          <li style={{ ...cardStyle, backgroundColor: '#f8f6f5' }} className="card">
            <div style={{ ...cardImageStyle, color: '#e57373' }}>✤</div>
            <h2>Michael Roman</h2>
            <p>Effective inventory management can be the difference between success and failure for many companies.</p>
          </li>
          <li style={{ ...cardStyle, backgroundColor: '#f1f8e9' }} className="card">
            <div style={{ ...cardImageStyle, color: '#81c784' }}>✦</div>
            <h2>Terry Esper</h2>
            <p>The key to inventory control is having the right inventory in the right place at the right time.</p>
          </li>
          <li style={{ ...cardStyle, backgroundColor: '#e8f5e9' }} className="card">
            <div style={{ ...cardImageStyle, color: '#64b5f6' }}>❖</div>
            <h2>John M. Topp</h2>
            <p>Inventory management is all about efficiency and accuracy, and getting the right products to the right place at the right time.</p>
          </li>
        </ul>
        <BorderBeam />
      </main>
      <style jsx>{`
        @keyframes backgroundAnimation {
          0% { background-position: center center; }
          100% { background-position: center top; }
        }
        @keyframes headerAnimation {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardAnimation {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        @keyframes iconDance {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .card:hover {
          ${cardHoverStyle}
        }
      `}</style>
    </div>
  );
};

export default Home;
