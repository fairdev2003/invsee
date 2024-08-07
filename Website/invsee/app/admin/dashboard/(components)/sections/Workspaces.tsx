'use client';

const Workspaces = () => {
  return (
    <div>
      <button onClick={() => {
        window.location.href = '/admin/dashboard/workspaces';
      }}>Redirect to workspaces</button>
    </div>
  );
};

export default Workspaces;
