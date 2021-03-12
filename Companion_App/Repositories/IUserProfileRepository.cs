using System.Collections.Generic;
using Fullstack_capstone.Models;

namespace Fullstack_capstone.Repositories
{
    public interface IUserProfileRepository
    {
  
        UserProfile GetByFirebaseUserId(string firebaseUserId);

      






    }
}