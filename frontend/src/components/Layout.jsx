import React from 'react';

const Layout = ({ left, middle, right }) => {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon">🐍</div>
          <span>PyTutor</span>
        </div>
        <nav className="app-nav">
          <a href="#" className="nav-link active">Learn</a>
          <a href="#" className="nav-link">Practice</a>
          <a href="#" className="nav-link">Progress</a>
        </nav>
      </header>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr 320px',
        height: 'calc(100vh - 65px)',
        overflow: 'hidden'
      }}>
        {/* Left Sidebar - Navigation */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Curriculum</h2>
          </div>
          <div className="sidebar-content">
            {left}
          </div>
        </aside>

        {/* Middle - Code Editor */}
        <main style={{
          background: 'var(--color-bg-primary)',
          borderRight: '1px solid var(--color-border-primary)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {middle}
        </main>

        {/* Right Sidebar - Hints */}
        <aside className="hints-panel">
          <div className="hints-header">
            <h2 className="hints-title">💡 Hints & Guide</h2>
          </div>
          <div className="hints-content">
            {right}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
