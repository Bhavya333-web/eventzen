using MongoDB.Driver;

namespace AttendeeService
{
    public class AttendeeServices
    {
        private readonly IMongoCollection<Attendee> _attendees;

        public AttendeeServices(IConfiguration config)
        {
            var client = new MongoClient(config["MongoDBSettings:ConnectionString"]);
            var database = client.GetDatabase(config["MongoDBSettings:DatabaseName"]);
            _attendees = database.GetCollection<Attendee>(config["MongoDBSettings:CollectionName"]);
        }

        public async Task<List<Attendee>> GetAllAsync() =>
            await _attendees.Find(_ => true).ToListAsync();

        public async Task<List<Attendee>> GetByEventIdAsync(string eventId) =>
            await _attendees.Find(a => a.EventId == eventId).ToListAsync();

        public async Task<Attendee> CreateAsync(Attendee attendee)
        {
            await _attendees.InsertOneAsync(attendee);
            return attendee;
        }

        public async Task DeleteAsync(string id) =>
            await _attendees.DeleteOneAsync(a => a.Id == id);
    }
}