import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Users as UsersIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { userService } from '../../../serices/user-service';
import DeleteModal from '../../../components/modal/delete-modal';
import AddUserModal from '../../../components/modal/add-user-modal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Changed from 1 to 10 for better UX

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getUsers();
      setUsers(usersData);
    } catch (error) {
      toast.error('Failed to load users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + itemsPerPage);

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  // Handle Add User
  const handleAddUser = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  // Handle Edit User
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  // Handle Delete User
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  // Save User (Add or Update)
  const handleSaveUser = async (userData) => {
    try {
      setModalLoading(true);
      
      if (selectedUser) {
        // Update existing user
        await userService.updateUser(selectedUser.id, userData);
        toast.success('User updated successfully!');
      } else {
        // Add new user
        await userService.addUser(userData);
        toast.success('User created successfully!');
      }
      
      setIsUserModalOpen(false);
      setSelectedUser(null);
      loadUsers(); // Refresh the list
      setCurrentPage(0); // Reset to first page after adding/editing
    } catch (error) {
      toast.error('Failed to save user: ' + error.message);
    } finally {
      setModalLoading(false);
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    try {
      setModalLoading(true);
      await userService.deleteUser(selectedUser.id);
      toast.success('User deleted successfully!');
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      loadUsers(); // Refresh the list
      
      // Adjust current page if the last item on the page was deleted
      if (currentUsers.length === 1 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      toast.error('Failed to delete user: ' + error.message);
    } finally {
      setModalLoading(false);
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date.seconds * 1000).toLocaleDateString();
  };

  return (
    <>
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <UsersIcon className="h-6 w-6" />
              <span>Dealer Users</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage dealer users and their permissions
            </p>
          </div>
          
          <button
            onClick={handleAddUser}
            className="mt-4 sm:mt-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Search and Stats Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
            />
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {Math.min(currentUsers.length, itemsPerPage)} of {filteredUsers.length} users
            {filteredUsers.length !== users.length && ` (filtered from ${users.length} total)`}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
        {loading ? (
          // Loading State
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : filteredUsers.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <UsersIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating a new user'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Add User</span>
              </button>
            )}
          </div>
        ) : (
          // Users Table with Pagination
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                          {user.role || 'dealer'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(user.createdAt) || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 p-1"
                            title="Edit user"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 p-1"
                            title="Delete user"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Component */}
            {pageCount > 1 && (
              <div className="border-t border-gray-200 dark:border-gray-600 px-6 py-4">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"flex items-center justify-between sm:justify-center space-x-2"}
                  pageClassName={"hidden sm:inline-block"}
                  pageLinkClassName={
                    "px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  }
                  previousClassName={"inline-block"}
                  previousLinkClassName={
                    "px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"
                  }
                  nextClassName={"inline-block"}
                  nextLinkClassName={
                    "px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center"
                  }
                  breakClassName={"hidden sm:inline-block"}
                  breakLinkClassName={
                    "px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300"
                  }
                  activeClassName={"active"}
                  activeLinkClassName={
                    "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 dark:bg-indigo-500 dark:border-indigo-500"
                  }
                  disabledClassName={"opacity-50 cursor-not-allowed"}
                  disabledLinkClassName={"hover:bg-transparent dark:hover:bg-transparent cursor-not-allowed"}
                  forcePage={currentPage}
                />
                
                {/* Mobile pagination info */}
                <div className="sm:hidden text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage + 1} of {pageCount}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* User Modal */}
      <AddUserModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
        onSave={handleSaveUser}
        user={selectedUser}
        loading={modalLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
        confirmText={modalLoading ? "Deleting..." : "Delete User"}
      />
    </>
  );
};

export default Users;