using Microsoft.AspNetCore.Mvc;

namespace AttendeeService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendeeController : ControllerBase
    {
        private readonly AttendeeServices _attendeeService;

        public AttendeeController(AttendeeServices attendeeService)
        {
            _attendeeService = attendeeService;
        }

        [HttpGet]
        public async Task<List<Attendee>> GetAll() =>
            await _attendeeService.GetAllAsync();

        [HttpGet("event/{eventId}")]
        public async Task<List<Attendee>> GetByEvent(string eventId) =>
            await _attendeeService.GetByEventIdAsync(eventId);

        [HttpPost]
        public async Task<Attendee> Create(Attendee attendee) =>
            await _attendeeService.CreateAsync(attendee);

        [HttpDelete("{id}")]
        public async Task Delete(string id) =>
            await _attendeeService.DeleteAsync(id);
    }
}