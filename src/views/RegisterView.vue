<template>
   

    <div id="main-wrapper" class="container">
        
<div class="row justify-content-center">
<div class="col-xl-10">
<div class="card border-0">
<div class="card-body p-0">
<div class="row no-gutters">
<div class="col-lg-6">
    <div class="p-5">
    <a href="/" >
  <i class="fas fa-arrow-left"></i> Go Back
    </a>
<div class="mb-5">
<h3 class="h4 font-weight-bold text-theme">Register</h3>
</div>
<h6 class="h5 mb-0">Create a new account!</h6>
<p class="text-muted mt-2 mb-5">We'll make sure your audio experience is seamless and personalized.</p>
<p class="text-danger mt-2 mb-5" v-if="flag">{{ message }}</p>
<form @submit.prevent="register()">

<div class="form-group">
<label for="exampleInputUser" >Username</label>
<input type="text" class="form-control" id="exampleInputUser" v-model="username">
</div>
<div class="form-group">
<label for="exampleInputEmail1">Email address</label>
<input type="email" class="form-control" id="exampleInputEmail1" v-model="email">
</div>
<div class="form-group mb-5">
<label for="exampleInputPassword1" >Password</label>
<input type="password" class="form-control" id="exampleInputPassword1" v-model="password" >
</div>
<button  type="submit" class="btn btn-theme">Register</button>
<!-- <a href="#l" class="forgot-link float-right text-primary">Forgot password?</a> -->
</form>
</div>
</div>
<div class="col-lg-6 d-none d-lg-inline-block">
<div class="account-block rounded-right">
<div class="overlay rounded-right"></div>
<div class="account-testimonial">
<p class="lead text-white"></p>
    <h3 class="text-white mb-4 text-right"></h3>
</div>
</div>
</div>
</div>
</div>

</div>

<p class="text-muted text-center mt-3 mb-0">Already have an account? <a href ="/login" class="text-primary ml-1">Login</a></p>

</div>

</div>

</div>
</template>

<script>
    import axios from '../axios'
    export default {
        name : "registerView",
        data(){
            return {
                email : "",
                password : "",
                username : "",
                message : "",
                flag : false
            }
        },
        methods:{
            async register(){
            const data = {
                username : this.username,
                email : this.email,
                password : this.password
            }
            try {
               const response= await axios.post('/register',data)
               if (response.data.error){
                this.flag = true
                this.message = response.data.message,
                setTimeout(() => {
                    this.flag = false
                },4000);
                
               }
               this.$router.push('/');
               
               
            } catch (error) {
                console.log(error)
            }
            

            }
        }
    }
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css');
a {
    text-decoration: none;
    color: inherit;
}


body{
    margin-top:20px;
    background: #f6f9fc;
}
.account-block {
    padding: 0;
    background-image: url('../assets/_777defbb-1d46-44bb-98aa-3da04534746f.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    position: relative;
    filter: invert(1); /* Invert colors */
    
}
.account-block .overlay {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
}
.account-block .account-testimonial {
    text-align: center;
    color: #fff;
    position: absolute;
    margin: 0 auto;
    padding: 0 1.75rem;
    bottom: 3rem;
    left: 0;
    right: 0;
}

.text-theme {
    color: #3e7a49 !important;
}
.form-control:focus {
    color: inherit; /* Use the default text color */
    background-color: #fff; /* Use the default background color */
    border-color: #ced4da; /* Use a neutral border color */
    outline: none; /* Remove the outline */
    box-shadow: none; /* Remove the box shadow */
}

.btn-theme {
    background-color: #3e7a49;
    border-color: #3e7a49;
    color: #fff;
}
</style>
