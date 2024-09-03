const eventStructure = {
    name: String,
    description: String,
    location: {
        country: String,
        town: String,
        location: String
    },
    duration: String,
    price: Number,
    organizer_ID: Number,
    image: Array,
    event_date: Date,
    places: Number
};

export default eventStructure;