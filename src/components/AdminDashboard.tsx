import { useAuth } from '../contexts/AuthContext';

// --- Icon Components ---
const UserCircleIcon = () => (
    <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
);

const StarIcon = ({ className = 'w-5 h-5' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);

const FolderIcon = () => <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>;
const DocumentIcon = () => <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>;

// --- Main Admin Dashboard Component ---
export default function AdminDashboard() {
  const { logout } = useAuth();

  const userProfile = { name: 'Administrator', title: 'System Admin' };
  const quickLinks = ['Profile Settings', 'Notifications', 'Task List', 'Help & Support'];
  const systemFolders = ['User Guides', 'Reports', 'System Logs', 'Archived Data'];

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      
      {/* --- Top Navigation Bar --- */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold text-gray-800 tracking-wider">Admin Panel</h1>
                <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Users</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Reports</a>
                    <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Settings</a>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">New Entry</button>
                <UserCircleIcon />
                <button onClick={logout} className="text-sm text-gray-600 hover:text-red-700 transition-colors duration-200">Logout</button>
            </div>
          </div>
          <div className="flex space-x-8 text-sm font-medium text-gray-500 border-t border-gray-200 md:mt-0 mt-2">
              <a href="#" className="py-3 border-b-2 border-indigo-600 text-indigo-600 font-semibold">Dashboard</a>
              <a href="#" className="py-3 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition-colors duration-200">Entries</a>
              <a href="#" className="py-3 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-600 transition-colors duration-200">Administration</a>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <main className="p-6 grid grid-cols-12 gap-8">
        
        {/* --- Left Sidebar --- */}
        <aside className="col-span-12 md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-bold text-md mb-4 text-gray-700">Navigation</h3>
                <nav className="space-y-2">
                    <a href="#" className="flex justify-between items-center p-2 text-sm font-medium bg-indigo-100 rounded-md text-indigo-800">
                        <div className="flex items-center space-x-3">
                            <StarIcon className="w-5 h-5 text-yellow-500"/>
                            <span>Dashboard</span>
                        </div>
                        <span className="text-indigo-600 font-bold">&gt;</span>
                    </a>
                    <a href="#" className="flex justify-between items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"><span>Analytics</span><span>&gt;</span></a>
                    <hr className="my-3"/>
                    <a href="#" className="flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"><DocumentIcon /><span>New Task</span></a>
                    <a href="#" className="flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"><DocumentIcon /><span>Export to Excel</span></a>
                    <a href="#" className="flex justify-between items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"><FolderIcon /><span>User Management</span><span>&gt;</span></a>
                    <a href="#" className="flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"><FolderIcon /><span>Content Editor</span></a>
                    <a href="#" className="flex items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"><FolderIcon /><span>File Manager</span></a>
                    <a href="#" className="flex justify-between items-center p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"><FolderIcon /><span>System Health</span><span>&gt;</span></a>
                </nav>
            </div>
        </aside>

        {/* --- Central Content --- */}
        <section className="col-span-12 md:col-span-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-1 text-gray-800">Content Submissions</h2>
            <p className="text-sm text-gray-600 mb-6">Review and manage user-submitted content.</p>
            <form className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input type="text" placeholder="Enter content title" className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <input type="text" placeholder="e.g., 'Product Updates'" className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700">Author</label>
                    <input type="text" placeholder="Author's name or ID" className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" />
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-700">Content</label>
                    <textarea placeholder="Enter main content here..." rows={4} className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"></textarea>
                </div>
                <button type="submit" className="px-6 py-2 bg-green-100 text-green-800 border border-green-300 rounded-lg hover:bg-green-200 font-semibold shadow-sm transition-transform transform hover:scale-105">Submit for Review</button>
            </form>
        </section>

        {/* --- Right Sidebar --- */}
        <aside className="col-span-12 md:col-span-3 space-y-8">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center space-x-4 mb-4">
                    <img className="w-12 h-12 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Admin avatar"/>
                    <div>
                        <h3 className="font-bold text-md text-gray-800">{userProfile.name}</h3>
                        <p className="text-xs text-gray-500">{userProfile.title}</p>
                    </div>
                </div>
                <nav className="space-y-2">
                    {quickLinks.map(link => (
                        <a key={link} href="#" className="flex items-center justify-between p-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200">
                            <span>{link}</span>
                            {link === 'Notifications' && <span className="w-5 h-5 bg-indigo-500 text-white text-xs flex items-center justify-center rounded-full font-bold">3</span>}
                        </a>
                    ))}
                </nav>
            </div>
             <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 text-sm text-gray-700">
                <h3 className="font-bold text-md mb-3 text-gray-800">System Folders</h3>
                <nav className="space-y-2">
                  {systemFolders.map(link => (
                      <a key={link} href="#" className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md transition-colors duration-200"><FolderIcon/><span>{link}</span></a>
                  ))}
                </nav>
             </div>
        </aside>
      </main>
    </div>
  );
}
