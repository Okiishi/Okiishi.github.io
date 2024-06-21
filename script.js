document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const clearFormButton = document.getElementById('clearForm');
    const clearAllButton = document.getElementById('clearAll');
    const searchInput = document.getElementById('search');

    const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
    const setUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

    const renderUsers = (users) => {
        userList.innerHTML = '';
        users.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = `${user.date} - ${user.username} - ${user.email}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deleteUser(index));
            li.appendChild(deleteButton);
            userList.appendChild(li);
        });
    };

    const addUser = (user) => {
        const users = getUsers();
        users.push(user);
        setUsers(users);
        renderUsers(users);
    };

    const deleteUser = (index) => {
        let users = getUsers();
        users.splice(index, 1);
        setUsers(users);
        renderUsers(users);
    };

    const clearAllUsers = () => {
        localStorage.removeItem('users');
        renderUsers([]);
    };

    const filterUsers = (query) => {
        const users = getUsers();
        const filteredUsers = users.filter(user => 
            user.username.includes(query) || user.email.includes(query)
        );
        renderUsers(filteredUsers);
    };

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
            date: new Date().toLocaleString(),
            username: userForm.username.value,
            email: userForm.email.value
        };
        addUser(user);
        userForm.reset();
    });

    clearFormButton.addEventListener('click', () => {
        userForm.reset();
    });

    clearAllButton.addEventListener('click', () => {
        clearAllUsers();
    });

    searchInput.addEventListener('input', (e) => {
        filterUsers(e.target.value);
    });

    renderUsers(getUsers());
});
