using System;
using System.IdentityModel.Tokens.Jwt; 
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace vote.Authentication
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        
        [HttpPost]
        [Route("token")]
        public IActionResult GetToken(User user)
        {
            if (user.Username != "NDC_USER" || user.Password != "NDC_PASSWORD")
                return BadRequest("User and Password is not OK");

            var token = new JwtSecurityToken
            (
                expires: DateTime.UtcNow.AddDays(60),
                notBefore: DateTime.UtcNow,
                claims: new []
                {
                    new Claim(JwtRegisteredClaimNames.Sub, Guid.NewGuid().ToString())
                },
                signingCredentials: new SigningCredentials(Common.NonSecureSymmetricSecurityKey, SecurityAlgorithms.HmacSha256)
            );

            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}