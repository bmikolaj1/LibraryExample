using LibraryExampleBE.Business.Models.DTO;
using LibraryExampleBE.Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LibraryExampleBE.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
           _userService = userService; 
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                return Ok(await _userService.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                return Ok(await _userService.GetById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(UserDetailsDTO input)
        {
            try
            {
                return Ok(await _userService.Create(input));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update(UserDetailsDTO input)
        {
            try
            {
                return Ok(await _userService.Update(input));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                return Ok(await _userService.DeleteById(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
