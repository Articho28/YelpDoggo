var mongoose = require("mongoose");
var Doggo = require("./models/doggo");
var Comment = require("./models/comment");

var data = [
    {
        name: "Doggo",
        image: "https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Pupper",
        image: "https://images.dailyhive.com/20190506162104/Camping-Feature.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Good Boy",
        image: "https://www.cbisland.com/content/uploads/2019/05/campgrounds-2-767x420.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
]

function seedDB() {

    //first, remove all doggos
    Doggo.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed Doggos");
            Comment.remove({}, function(err) {
                if (err) {
                    console.log("There was an error when removing comments");
                    console.log(err);
                } else {
                    //add a few campgrouds
                    data.forEach(function(seed) {
                        Doggo.create(seed, function(err, newDoggo) {
                            if (err) {
                                console.log("There was an error when creating the Doggo")
                                console.log(err);
                            } else {
                                console.log("added a Doggo");
                                //create a comment
                                Comment.create(
                                                {
                                                    text: "This place is great but I wish there was hummus",
                                                    author: "Mike Tyson"
                                                }, function(err, comment) {
                                                    if (err) {
                                                        console.log("There was an erro when creating the comment");
                                                        console.log(err);
                                                    } else {
                                                        newDoggo.comments.push(comment);
                                                        newDoggo.save();
                                                        console.log("Created new comment");
                                                    }
                                                });
                            }
                        });
                    });
                }
            })
            
        }
        
    });
    
    
    //add a few comments
}
module.exports = seedDB;



