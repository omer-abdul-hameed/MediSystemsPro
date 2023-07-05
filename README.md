# MediSystemsPro
## Route Table

| URL                      	| REST ROUTE 	| HTTP Verb 	| CRUD Action   	| View.ejs            	|
|--------------------------	|------------	|-----------	|---------------	|---------------------	|
| /                        	|            	| GET       	| read          	| home.ejs            	|
| /patients                	| index      	| GET       	| read          	| patient-index.ejs   	|
| /patients/:id            	| show       	| GET       	| read          	| patient-details.ejs 	|
| /patients/new            	| new        	| GET       	|               	| new-patient.ejs     	|
| /patients                	| create     	| POST      	| create        	|                     	|
| /patients/:id/edit       	| edit       	| GET       	| read          	| edit-patient.ejs    	|
| /patients/:id            	| update     	| PATCH/PUT 	| update        	|                     	|
| /patients/:id/checkin    	| update     	| PATCH/PUT 	| update        	|                     	|
| /patients/:id/checkout   	| update     	| PATCH/PUT 	| update        	|                     	|
| /patients/:id            	| destroy    	| DELETE    	| delete        	|                     	|
| /doctors                 	| index      	| GET       	| read          	| doctor-index.ejs    	|
| /doctors/:id             	| show       	| GET       	| read          	| doctor-details.ejs  	|
| /doctors/new             	| new        	| GET       	|               	| new-doctor.ejs      	|
| /doctors                 	| create     	| POST      	| create        	|                     	|
| /doctors/:id/edit        	| edit       	| GET       	| read          	| edit-doctor.ejs     	|
| /doctors/:id             	| update     	| PATCH/PUT 	| update        	|                     	|
| /doctors/:id/available   	| update     	| PATCH/PUT 	| update        	|                     	|
| /doctors/:id/unavailable 	| update     	| PATCH/PUT 	| update        	|                     	|
| /doctors/:id             	| destroy    	| DELETE    	| delete        	|                     	|
| /check-in-status         	| index      	| GET       	| read          	| check-in-status.ejs 	|
| /about                   	|            	| GET       	|               	| about.ejs           	|
| /seed                    	|            	| GET       	| delete&create 	|                     	|
| /*                       	|            	| GET       	|               	| 404.ejs             	|

