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
    
    public partial class PP_Param_Num_Val
    {
        public int PP_Param_Num_ValId { get; set; }
        public int PP_ParamId { get; set; }
        public double PP_NumVal { get; set; }
        public Nullable<bool> PP_NumVal_Active { get; set; }
        public Nullable<System.DateTime> PP_Date { get; set; }
    
        public virtual PP_Param PP_Param { get; set; }
    }
}
