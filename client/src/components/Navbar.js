import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = '/login';
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/home">
          MORNING DEW
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon text-white"><i class="fa fa-bars"></i></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto mr-3">
            {user ? (
              <>
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                   <i class="fa fa-user"></i> {user.name}
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Logout
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <a class="nav-link active" href="/register">
                  Register
                </a>
                <a class="nav-link" href="/login">
                  Login
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
