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
    
    public partial class FSFE_FPatternFII_Val
    {
        public int FSFE_FPatternFII_Id { get; set; }
        public int FSFE_ProdId { get; set; }
        public int FSFE_ParamId { get; set; }
        public string Remark { get; set; }
        public string ImagePath { get; set; }
    
        public virtual FSFE_Param FSFE_Param { get; set; }
        public virtual FSFE_Prod FSFE_Prod { get; set; }
    }
}