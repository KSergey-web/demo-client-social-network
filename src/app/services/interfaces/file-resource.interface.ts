export interface FileResource {
        _id: string;
        
        originalName: string;
        
        buffer?: string;

        mimetype: string;
}


export interface FileResAndBuffer
{
  fileRes:FileResource;

  buffer?:any;
}