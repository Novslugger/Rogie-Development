//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PASAROperations.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class EmployeeRole
    {
        public EmployeeRole()
        {
            this.TeamShifts = new HashSet<TeamShift>();
            this.TeamTypeShifts = new HashSet<TeamTypeShift>();
        }
    
        public int EmployeeRoleId { get; set; }
        public string EmployeeRoleName { get; set; }
    
        public virtual ICollection<TeamShift> TeamShifts { get; set; }
        public virtual ICollection<TeamTypeShift> TeamTypeShifts { get; set; }
    }
}
