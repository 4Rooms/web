export const cutTextFunction = (text: string, title: string, isSmallScreen?: boolean) => {
    const config = {
      block: {
        limit: 10,
        ellipse: false,
      },
      navigation: {
        limit: 35, 
        ellipse: true,
      },
      delete: {
        limitSmall: 10,
        limit: 20,
        ellipse: true,
      },
      information: {
        limitSmall: 10,
        limit: 23,
        ellipse: true,
      },
      groups: {
        limit: 20,
        ellipse: true,
      },
    };
  
    const option = config[title];
  
    if (!option) {
      return text; 
    }
  
    let modifiedText = "";
  
    if (isSmallScreen && option.limitSmall) {
      modifiedText = text.substring(0, option.limitSmall);
    } else if (option.limit) {
      modifiedText = text.substring(0, option.limit);
    } else {
      modifiedText = text;
    }
  
    if (option.ellipse && modifiedText !== text) {
      modifiedText += "...";
    }
    
    return modifiedText;
  }