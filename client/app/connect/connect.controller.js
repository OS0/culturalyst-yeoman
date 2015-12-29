angular.module('culturalystApp')
  .controller('ConnectCtrl', function ($scope, $http, $location, stripe) {

    var artistId = $location.path().split('/').pop();


    $scope.register = function(){
      //TODO: Add bank acct Validation
      $http({
        method: 'GET',
        url: '/api/users/me'
      }).then(function(res){
        console.log('res: ',res)
        //creates a bank acct token
        stripe.bankAccount.createToken({
          country: $scope.country,
          routing_number: $scope.route,
          account_number: $scope.acct
        }).then(function(acct){
          console.log('registering bruh')
          console.log('banking: ',acct)
          //send data to server
          $http({
            method: 'PUT',
            url: 'api/users/register',
            data: {
              data: {
                managed: true,
                legal_entity: {
                  first_name: $scope.first,
                  last_name: $scope.last,
                  address: {
                    line1: $scope.address,
                    city: $scope.city,
                    state: $scope.state,
                    postal_code: $scope.zip,
                    country: $scope.country,
                  },
                  dob: {
                    day: $scope.day,
                    month: $scope.month,
                    year: $scope.year
                  },
                  type: $scope.type
                },
                email: $scope.email,
                external_account: acct.id,
                tos_acceptance: {
                  date: null,
                  ip: null
                }
              },
              _id: res.data._id
            }
          })
        })

      })



    };



  });
