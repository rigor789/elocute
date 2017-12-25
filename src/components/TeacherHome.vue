<template> 
	<v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex xs1 offset-xs11>
        <v-btn color="info" @click="logOut">Logout</v-btn>
      </v-flex>
      <v-flex xs12>        
				<v-card tile color="tile" class="pa-4">
					<h1 text-xs-center>Welcome {{name}}</h1>
					<h4 text-xs-center>Account Details</h4>            
					<p>Name: {{name}}</p> 
					<p>Email: {{email}}</p> 
					<p>Teacher Id: {{userId}}</p>
					<v-btn color="primary">Create a New Classroom</v-btn>
				</v-card>
				<v-card tile color="tile" class="pa-4">
					<h3>My Classrooms</h3>
				</v-card>				
      </v-flex>
      
    </v-layout>
  </v-container>
		
  		
	
</template>

<script>
import firebase from 'firebase';
export default {
	data() {
		return {
			userId: '',
			name: '',
			email: '',
			user: {},
		};
	},
	created() {
		this.user = firebase.auth().currentUser;
		if (this.user) {
			this.name = this.user.displayName;
			this.email = this.user.email;
			this.userId = this.user.uid;
		}
	},
	methods: {
		logOut() {
			firebase.auth().signOut();
		},
	},
};
</script>