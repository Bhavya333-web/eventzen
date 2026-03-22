using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AttendeeService
{
    public class Attendee
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string EventId { get; set; } = string.Empty;
        public string Status { get; set; } = "registered";
        public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
    }
}