
macro_rules! hello{
	($name:expr)=>{
		println!("Hi name! {}",$name)
	}
}

fn main(){
//ex1: variable mutable
	let mut x="Hello Bam"; //mut es para que sea variable, sino es constante por default
	let y="Asignacion";
	println!("Printing {}",x);

	x=y;
	println!("Printing {}",x);
//ex2: funciones
	println!("Printing function:");
	test(2);

	//ex3 funcion por declaracion
	let a=ejemplo();
	println!("a:{}",a);

	//ex4: if
	let b=10;
	if b<9 {
		println!("B")
	}else{
		println!("C")
	}

	//ex5_control de flujos
	let mut x=0;
	loop{
		if x==5{
			println!("hasta aqui");
			break
		}else{
			println!("Hola tribu BAM!");
		}
		x+=1;
	}

	let mut y1=0;
	let condicion:bool=true;
	let z=1.1;
	while y1<10{
		y1+=1;
		println!("Print while {} {} {}",y1,condicion,z)
	}

	//ex6:tuplas
	let tuplas:(i32,f64,i8)=(4,89.2,6);

	//ex7:macros (designators:item, block,stmt,pat,expr,ty,ident,path,meta,tt)
	hello!("Faucet0x");
}



fn test(x:i32){
	println!("Inside the function x= {}",x)
}

fn ejemplo()->i32{5}