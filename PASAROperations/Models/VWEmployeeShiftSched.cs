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
    
    public partial class VWEmployeeShiftSched
    {
        public System.DateTime ShiftDate { get; set; }
        public Nullable<int> ShiftSchedId { get; set; }
        public string ShiftName { get; set; }
        public string Supervisor { get; set; }
        public string Skimmer1 { get; set; }
        public string Skimmer2 { get; set; }
        public string Operator { get; set; }
    }
}