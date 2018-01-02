<template> 
	<v-container grid-list-md text-xs-center>
    <v-layout column>
      <v-flex xs1 offset-xs11>
        <v-btn color="info" @click="logOut">Logout</v-btn>
      </v-flex>
      <v-flex xs12>        
				<v-card tile color="tile" class="pa-4">
					<h1 text-xs-center>Welcome {{user.displayName}}</h1>
					<v-form v-model="valid" ref="form" lazy-validation>
						<v-text-field
							label="Classroom Name"
							v-model="classroomName"
							:rules="classroomNameRules"
							:counter="20"
							required
						></v-text-field>
						<v-btn class="info"
							@click="submit"
							:disabled="!valid"
						>
						create a classroom
						</v-btn>
					</v-form>
				</v-card>											
      </v-flex>      
    </v-layout>

	<h3 class="pa-4">My Classrooms</h3>

	<!--<v-card color="tile">			
		<v-layout row wrap color="tile">
            <v-flex
              xs4
              v-for="(item, key) in classrooms"
              :key="key"
            >
              <v-card flat tile>
                <h3><router-link :to="{ name: 'ClassroomHome', params: { id: item['.key']}}">{{item.ClassName}}</router-link></h3>
               
              </v-card>
            </v-flex>
          </v-layout>
		</v-card>-->
  </v-container>	
</template>

<script>
import Firebase from 'firebase';

export default {
	computed: {
		user() {
			return this.$store.getters.getUser;
		},
	},
	data: () => ({
		valid: true,
		userId: '',
		name: '',
		email: '',
		//user: {},
		item: {},
		classroomName: '',
		classroomNameRules: [
			v => !!v || 'Classroom name is required',
			v => v.length <= 20 || 'Name must be fewer than 20 characters',
		],
	}),
	created() {
		/*this.user = firebase.auth().currentUser;
		if (this.user) {
			this.name = this.user.displayName;
			this.email = this.user.email;
			this.userId = this.user.uid;
			this.$bindAsArray('classrooms', db.ref('Classrooms/' + this.userId));
		}*/
	},
	methods: {
		logOut() {
			Firebase.auth()
				.signOut()
				.then(() => {
					this.$router.replace('Auth');
				});
		},
		submit() {
			/*let classroom = db.ref('Classrooms/' + this.userId);
			if (this.$refs.form.validate()) {
				classroom.push({
					ClassName: this.classroomName,
				});
			}*/
		},
	},
};
</script>