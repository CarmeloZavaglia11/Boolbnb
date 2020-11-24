@extends('layouts.extranet')

@section ('css')

@endsection


@section('content')

    <div id="apartment"class="apartments container d-flex flex-column">
    <h2 >My Apartments</h2>
    @foreach($apartments as $apartment)

            <div class="d-flex i-card-e mb-3 rounded ">
                <div class="i-card-e-img-top" style="background-image: url({{$apartment->cover->imgurl}}"></div>
                <div class="i-card-body p-2 d-flex ">
                    <div class="i-left d-flex flex-column justify-content-between">
                        <div class="i-top-card">
                            <h6 class="m-0 font-weight-bold text-primary">{{ $apartment->title }}</h6>
                        </div>
                        <div class="det-ap d-flex flex-column justify-content-between">
                            <small>Numero stanze {{$apartment->n_rooms}}</small>
                            <small>Numero letti {{$apartment->n_beds}}</small>
                            <small>Numero bagni {{$apartment->n_bathrooms}}</small>
                        </div>


                    </div>

                    <div class="i-right d-flex flex-column justify-content-between">
                        <div class="d-flex justify-content-end w-100">
                            <div class="i-vote text-center rounded">{{$apartment->rating()}}</div>
                        </div>

                        <div class="buttons">
                            <a class="btn btn-primary" href="{{route('apartments.edit',$apartment->id)}}">MODIFICA</a>
                            <form action="{{route('apartments.destroy',$apartment->id)}}" method="post">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn w-100 btn-danger">ELIMINA</button>
                            </form>
                        </div>

                    </div>
                    

                </div>

            </div>

    @endforeach
    </div>
@endsection
