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
    
    public partial class REFTH_MachineDowntime
    {
        public int REFTH_MachineDowntimeId { get; set; }
        public System.DateTime REFTH_MDDate { get; set; }
        public int REFTH_MDMachineId { get; set; }
        public int REFTH_MDReasonId { get; set; }
        public System.DateTime REFTH_MDStartTime { get; set; }
        public System.DateTime REFTH_MDEndTime { get; set; }
        public int REFTH_MDDowntimeMin { get; set; }
        public string REFTH_MDRemarks { get; set; }
        public Nullable<int> REFTH_ResponsibleId { get; set; }
    
        public virtual REFTH_Machines REFTH_Machines { get; set; }
        public virtual REFTH_MDReasonCodes REFTH_MDReasonCodes { get; set; }
    }
}
