<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/" class="text-white">Home</b-nav-item>
        <b-nav-item to="/about"  class="text-white">About</b-nav-item>
        <b-nav-item to="Infos" class="text-white">Informations</b-nav-item>
        <b-nav-item to="Files" class="text-white">Files</b-nav-item>
        
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>